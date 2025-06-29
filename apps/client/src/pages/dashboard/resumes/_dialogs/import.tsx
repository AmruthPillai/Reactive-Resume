import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Check, DownloadSimple } from "@phosphor-icons/react";
import type { JsonResume, LinkedIn, pdfResume, ReactiveResumeV3 } from "@reactive-resume/parser";
import {
  JsonResumeParser,
  LinkedInParser,
  PdfResumeParser,
  ReactiveResumeParser,
  ReactiveResumeV3Parser,
} from "@reactive-resume/parser";
import type { ResumeData } from "@reactive-resume/schema";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@reactive-resume/ui";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// Import react-json-view and its default styles
import ReactJson from "react-json-view";
import { z, ZodError } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { useImportResume } from "@/client/services/resume/import";
import { useDialog } from "@/client/stores/dialog";

enum ImportType {
  "reactive-resume-json" = "reactive-resume-json",
  "reactive-resume-v3-json" = "reactive-resume-v3-json",
  "json-resume-json" = "json-resume-json",
  "linkedin-data-export-zip" = "linkedin-data-export-zip",
  "pdf-docx-doc" = "pdf-docx-doc",
}

// Updated schema: aiParsedJson is now `any` to hold a JSON object directly
const formSchema = z.object({
  file: z.instanceof(File).optional(),
  type: z.nativeEnum(ImportType),
  aiParsedJson: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;
type SummarizeResponse = {
  output: string;
  elapsed_seconds: number;
};
type ValidationResult =
  | {
      isValid: false;
      errors: string;
    }
  | {
      isValid: true;
      type: ImportType;
      result: ResumeData | ReactiveResumeV3 | LinkedIn | JsonResume | pdfResume;
    };

// The stripHtmlTags function is no longer needed with react-json-view

export const ImportDialog = () => {
  const { toast } = useToast();
  const { isOpen, close } = useDialog("import");
  const { importResume, loading } = useImportResume();

  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [summarisedErrors, setSummarisedErrors] = useState<string | null>(null);
  const [showParsedJson, setShowParsedJson] = useState(false);
  const [showSummarizedError, setShowSummarizedError] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      type: ImportType["reactive-resume-json"],
      aiParsedJson: null, // Default to null for an object
    },
    resolver: zodResolver(formSchema),
  });
  const aiParsedJsonValue = form.watch("aiParsedJson");

  const filetype = form.watch("type");

  useEffect(() => {
    if (isOpen) {
      onReset();
      setShowParsedJson(false);
    }
  }, [isOpen]);

  useEffect(() => {
    form.reset({ file: undefined, type: filetype, aiParsedJson: null });
    setValidationResult(null);
    setShowParsedJson(false); // Reset visibility when filetype changes
  }, [filetype]);

  const summarizeErrorViaAi = async (): Promise<string> => {
    try {
      if (validationResult?.isValid === false && validationResult.errors) {
        const aiParsedJsonString = JSON.stringify(aiParsedJsonValue, null, 2);
        const response = await axios.post<SummarizeResponse>(
          "http://localhost:8000/generate-json",
          {
            system_prompt: t`Summarize the following error message clearly and suggest what might have gone wrong or how to fix it with ${aiParsedJsonString}.`,
            input_text: Array.isArray(validationResult.errors)
              ? validationResult.errors.join("\n")
              : String(validationResult.errors),
          },
        );
        return response.data.output;
      }
    } catch {
      return t`Could not summarize error. Please try again.`;
    }
    return t`No error to summarize.`;
  };

  useEffect(() => {
    const handleSummarize = async () => {
      if (validationResult) {
        if (validationResult.isValid) {
          setSummarisedErrors(null);
        } else {
          try {
            const summary = await summarizeErrorViaAi();
            setSummarisedErrors(summary);
          } catch (error: unknown) {
            setSummarisedErrors(
              t`An error occurred while parsing validation: ` +
                (error instanceof Error ? error.message : t`unknown error`),
            );
          }
        }
      } else {
        setSummarisedErrors(null);
      }
    };
    void handleSummarize();
  }, [validationResult]);
  function getAccept(filetype: ImportType | string) {
    switch (filetype) {
      case "reactive-resume-json":
      case "reactive-resume-v3-json":
      case "json-resume-json": {
        return ".json";
      }
      case "pdf-docx-doc": {
        return ".pdf,.doc,.docx";
      }
      case "linkedin-data-export-zip": {
        return ".zip";
      }
      default: {
        return "";
      }
    }
  }

  const accept = getAccept(filetype);

  const onParseWithAI = async (file: File) => {
    toast({
      title: t`Parsing file with AI...`,
      description: t`Please wait, this might take a moment.`,
    });

    try {
      const parser = await new PdfResumeParser();
      const response = await parser.readFile(file);
      if (!response) {
        throw new Error(t`No data returned from AI parsing.`);
      }

      // Set the JSON object directly into the form state
      form.setValue("aiParsedJson", response);
      setShowParsedJson(true);
      setValidationResult(null);

      toast({
        variant: "success",
        title: t`File parsed successfully by AI.`,
        description: t`Please review and amend the data if necessary.`,
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t`Failed to parse file with AI. Please try again.`,
        description: error instanceof Error ? error.message : undefined,
      });
      form.setValue("aiParsedJson", null);
      setShowParsedJson(false);
    }
  };

  const onValidate = async (dataToValidate?: object) => {
    try {
      const { file, type } = form.getValues();
      let data: any;

      if (dataToValidate) {
        // If dataToValidate is provided (from the JSON editor), use it directly
        data = dataToValidate;
      } else if (file) {
        // Otherwise, use the uploaded file
        switch (type) {
          case ImportType["reactive-resume-json"]: {
            const parser = new ReactiveResumeParser();
            data = await parser.readFile(file);
            break;
          }
          // ... (other file reading cases remain the same)
          case ImportType["reactive-resume-v3-json"]: {
            const parser = new ReactiveResumeV3Parser();
            data = await parser.readFile(file);
            break;
          }
          case ImportType["json-resume-json"]: {
            const parser = new JsonResumeParser();
            data = await parser.readFile(file);
            break;
          }
          case ImportType["linkedin-data-export-zip"]: {
            const parser = new LinkedInParser();
            data = await parser.readFile(file);
            break;
          }
          case ImportType["pdf-docx-doc"]: {
            toast({
              variant: "warning",
              title: t`Please use the 'Parse with AI' button for PDF/Word documents first.`,
            });
            return;
          }
        }
      } else {
        setValidationResult({
          isValid: false,
          errors: JSON.stringify({ message: t`No file or data to validate.` }),
        });
        toast({ variant: "error", title: t`No file or data to validate.` });
        return;
      }

      let result: ResumeData | ReactiveResumeV3 | LinkedIn | JsonResume | pdfResume;

      // ... (validation logic remains largely the same)
      switch (type) {
        case ImportType["reactive-resume-json"]: {
          const parser = new ReactiveResumeParser();
          result = parser.validate(data);
          break;
        }
        case ImportType["reactive-resume-v3-json"]: {
          const parser = new ReactiveResumeV3Parser();
          result = parser.validate(data);
          break;
        }
        case ImportType["json-resume-json"]: {
          const parser = new JsonResumeParser();
          result = parser.validate(data);
          break;
        }
        case ImportType["linkedin-data-export-zip"]: {
          const parser = new LinkedInParser();
          result = await parser.validate(data);
          break;
        }
        case ImportType["pdf-docx-doc"]: {
          const parser = new PdfResumeParser();
          result = parser.validate(data as pdfResume);
          break;
        }
        default: {
          throw new Error("Unsupported import type for validation.");
        }
      }

      setValidationResult({ isValid: true, type, result });
      toast({ variant: "success", title: t`Validation successful!` });
    } catch (error) {
      // ... (error handling remains the same)
      if (error instanceof ZodError) {
        setValidationResult({ isValid: false, errors: error.toString() });
        toast({
          variant: "error",
          title: t`An error occurred while validating the file.`,
          description: error.message,
        });
      } else if (error instanceof Error) {
        setValidationResult({ isValid: false, errors: JSON.stringify({ message: error.message }) });
        toast({
          variant: "error",
          title: t`An error occurred during validation.`,
          description: error.message,
        });
      } else {
        setValidationResult({
          isValid: false,
          errors: JSON.stringify({ message: t`An unknown error occurred.` }),
        });
        toast({ variant: "error", title: t`An unknown error occurred.` });
      }
    }
  };

  const onImport = async () => {
    const { type, aiParsedJson, file } = form.getValues();

    if (!validationResult?.isValid) {
      toast({ variant: "error", title: t`Please validate the data first.` });
      return;
    }

    try {
      // Use the JSON object directly if it exists, otherwise read from file
      let dataToConvert: any = showParsedJson && aiParsedJson ? aiParsedJson : null;

      if (!dataToConvert && file) {
        // Fallback to reading file if aiParsedJson isn't available
        if (type === ImportType["reactive-resume-json"]) {
          const parser = new ReactiveResumeParser();
          dataToConvert = await parser.readFile(file);
        } // ... other file types
        else if (type === ImportType["reactive-resume-v3-json"]) {
          const parser = new ReactiveResumeV3Parser();
          dataToConvert = await parser.readFile(file);
        } else if (type === ImportType["json-resume-json"]) {
          const parser = new JsonResumeParser();
          dataToConvert = await parser.readFile(file);
        } else if (type === ImportType["linkedin-data-export-zip"]) {
          const parser = new LinkedInParser();
          dataToConvert = await parser.readFile(file);
        }
      }

      if (!dataToConvert) {
        toast({ variant: "error", title: t`No data available to import.` });
        return;
      }

      let finalResumeData: ResumeData;

      // ... (conversion logic remains the same)
      switch (type) {
        case ImportType["reactive-resume-json"]: {
          const parser = new ReactiveResumeParser();
          finalResumeData = parser.convert(dataToConvert as ResumeData);
          break;
        }
        case ImportType["reactive-resume-v3-json"]: {
          const parser = new ReactiveResumeV3Parser();
          finalResumeData = parser.convert(dataToConvert as ReactiveResumeV3);
          break;
        }
        case ImportType["json-resume-json"]: {
          const parser = new JsonResumeParser();
          finalResumeData = parser.convert(dataToConvert as JsonResume);
          break;
        }
        case ImportType["linkedin-data-export-zip"]: {
          const parser = new LinkedInParser();
          finalResumeData = parser.convert(dataToConvert as LinkedIn);
          break;
        }
        case ImportType["pdf-docx-doc"]: {
          const parser = new PdfResumeParser();
          finalResumeData = parser.convert(dataToConvert as pdfResume);
          break;
        }
        default: {
          throw new Error("Unsupported import type for conversion.");
        }
      }

      await importResume({ data: finalResumeData });
      close();
    } catch (error: unknown) {
      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  const onReset = () => {
    form.reset({
      type: ImportType["reactive-resume-json"],
      file: undefined,
      aiParsedJson: null,
    });
    setValidationResult(null);
    setShowParsedJson(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-2xl">
        {" "}
        {/* Increased width for better JSON view */}
        <Form {...form}>
          <form className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                  <DownloadSimple />
                  <h2>{t`Import an existing resume`}</h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                {t`Upload a file from one of the accepted sources to parse existing data and import it into Reactive Resume for easier editing.`}
              </DialogDescription>
            </DialogHeader>

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Filetype`}</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={t`Please select a file type`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="reactive-resume-json">
                          Reactive Resume (.json)
                        </SelectItem>
                        <SelectItem value="reactive-resume-v3-json">
                          Reactive Resume v3 (.json)
                        </SelectItem>
                        <SelectItem value="json-resume-json">JSON Resume (.json)</SelectItem>
                        <SelectItem value="linkedin-data-export-zip">
                          LinkedIn Data Export (.zip)
                        </SelectItem>
                        <SelectItem value="pdf-docx-doc">
                          PDF / Word Documents (.pdf, .doc, .docx)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="file"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`File`}</FormLabel>
                  <FormControl>
                    <Input
                      key={`${accept}-${filetype}`}
                      type="file"
                      accept={accept}
                      onChange={(event) => {
                        if (!event.target.files?.length) return;
                        field.onChange(event.target.files[0]);
                        setShowParsedJson(false);
                        form.setValue("aiParsedJson", null);
                        setValidationResult(null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {accept && <FormDescription>{t`Accepts only ${accept} files`}</FormDescription>}
                </FormItem>
              )}
            />

            {filetype === ImportType["pdf-docx-doc"] && form.watch("file") && (
              <Button
                type="button"
                onClick={() => {
                  const file = form.getValues("file");
                  if (file) {
                    void onParseWithAI(file);
                  }
                }}
                disabled={loading}
              >
                {t`Parse with AI`}
              </Button>
            )}

            {filetype === ImportType["pdf-docx-doc"] && form.watch("file") && (
              <Button
                className="ml-2 bg-secondary"
                type="button"
                onClick={() => {
                  setValidationResult(null); // Reset validation result
                }}
                disabled={loading} // Disable if parsing is in progress
              >
                {t`Reset`}
              </Button>
            )}

            {/* Section to display AI parsed JSON using react-json-view */}
            {showParsedJson && (
              <FormField
                name="aiParsedJson"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t`AI Parsed JSON`}</FormLabel>
                    <FormControl>
                      <div className="rounded-sm border p-2">
                        <ReactJson
                          src={field.value ?? {}} // Provide a default empty object
                          name={false}
                          theme="google" // A clean default theme
                          iconStyle="triangle"
                          displayDataTypes={false}
                          style={{ maxHeight: "400px", overflowY: "auto" }}
                          onEdit={(edit) => {
                            field.onChange(edit.updated_src);
                            setValidationResult(null);
                          }}
                          onAdd={(add) => {
                            field.onChange(add.updated_src);
                            setValidationResult(null);
                          }}
                          onDelete={(del) => {
                            field.onChange(del.updated_src);
                            setValidationResult(null);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      {t`Review the AI-generated JSON. You can amend it directly here before validating and importing.`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {validationResult?.isValid === false && (
              <div>
                <div className="flex w-full justify-between space-y-2">
                  <Label className="text-error">{t`Errors`}</Label>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowSummarizedError((prev) => !prev);
                    }}
                  >{t`Summarize`}</Button>
                </div>
                <div>
                  <ScrollArea orientation="vertical" className="h-[180px]">
                    <div className="whitespace-pre-wrap rounded bg-secondary-accent p-4 font-mono text-xs leading-relaxed">
                      {showSummarizedError
                        ? summarisedErrors
                        : JSON.stringify(JSON.parse(validationResult.errors), null, 4)}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}

            <DialogFooter>
              <AnimatePresence presenceAffectsLayout>
                {(!showParsedJson && !validationResult) ||
                (showParsedJson && !validationResult && aiParsedJsonValue) ||
                (showParsedJson &&
                  validationResult &&
                  !validationResult.isValid &&
                  aiParsedJsonValue) ? (
                  <Button
                    className={aiParsedJsonValue ? "bg-primary" : "bg-secondary"}
                    type="button"
                    disabled={
                      loading ||
                      (showParsedJson && !aiParsedJsonValue) ||
                      (!showParsedJson && !form.getValues("file"))
                    }
                    onClick={() => {
                      if (showParsedJson && aiParsedJsonValue) {
                        void onValidate(aiParsedJsonValue);
                      } else {
                        void onValidate();
                      }
                    }}
                  >
                    {t`Validate`}
                  </Button>
                ) : null}

                {validationResult !== null && !validationResult.isValid && (
                  <Button type="button" variant="secondary" onClick={onReset}>{t`Discard`}</Button>
                )}

                {validationResult !== null && validationResult.isValid && (
                  <>
                    <Button type="button" disabled={loading} onClick={onImport}>{t`Import`}</Button>
                    <Button disabled type="button" variant="success">
                      <Check size={16} weight="bold" className="mr-2" />
                      {t`Validated`}
                    </Button>
                  </>
                )}
              </AnimatePresence>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
