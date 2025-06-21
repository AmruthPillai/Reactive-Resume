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
  RichInput,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@reactive-resume/ui";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  file: z.instanceof(File).optional(),
  type: z.nativeEnum(ImportType),
  aiParsedJson: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

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

function stripHtmlTags(html: string): string {
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "");
  }
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent ?? "";
}

export const ImportDialog = () => {
  const { toast } = useToast();
  const { isOpen, close } = useDialog("import");
  const { importResume, loading } = useImportResume();

  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showParsedJson, setShowParsedJson] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: {
      type: ImportType["reactive-resume-json"],
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
    form.reset({ file: undefined, type: filetype, aiParsedJson: "" });
    setValidationResult(null);
    setShowParsedJson(false); // Reset visibility when filetype changes
  }, [filetype]);

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

      // Assuming your AI returns data in a format convertible to ResumeData
      const parsedJsonString = JSON.stringify(response, null, 2);
      form.setValue("aiParsedJson", parsedJsonString);
      setShowParsedJson(true); // Show the text area with parsed JSON
      setValidationResult(null); // Reset validation when new AI data arrives

      toast({
        variant: "success",
        title: t`File parsed successfully by AI.`,
        description: t`Please review and amend the data if necessary.`,
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t`Failed to parse file with AI.`,
        description: error instanceof Error ? error.message : undefined,
      });
      form.setValue("aiParsedJson", ""); // Clear the field on error
      setShowParsedJson(false);
    }
  };

  const onValidate = async (dataToValidate?: string) => {
    try {
      const { file, type } = form.getValues();
      let data: any;

      if (dataToValidate) {
        // If dataToValidate is provided (from the textarea)

        if (dataToValidate) {
          // If dataToValidate is provided (from the textarea)
          // Check if it's already an object (e.g., if passed directly from another function)
          // or if it's a string that needs parsing.
          if (typeof dataToValidate === "string") {
            // Attempt to parse the string. This is the most common case for textarea content.
            data = JSON.parse(dataToValidate);
          } else if (typeof dataToValidate === "object" && dataToValidate !== null) {
            // If it's already a non-null object, use it directly.
            data = dataToValidate;
          } else {
            // Handle cases like dataToValidate being null, undefined, or a non-parseable type
            throw new Error("Invalid data format for validation.");
          }
        }
      } else if (file) {
        // Otherwise, use the uploaded file
        switch (type) {
          case ImportType["reactive-resume-json"]: {
            const parser = new ReactiveResumeParser();
            data = await parser.readFile(file);

            break;
          }
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
            // For PDF/DOCX, the validation often happens after AI parsing
            // We'll rely on the `dataToValidate` path for this.
            toast({
              variant: "warning",
              // eslint-disable-next-line lingui/text-restrictions
              title: t`Please use the "Parse with AI" button for PDF/Word documents first.`,
            });
            return;
          }
          // No default
        }
      } else {
        // No file and no dataToValidate
        setValidationResult({
          isValid: false,
          // eslint-disable-next-line lingui/no-unlocalized-strings
          errors: JSON.stringify({ message: "No file uploaded or data to validate." }),
        });
        toast({
          variant: "error",
          title: t`No file or data to validate.`,
        });
        return;
      }

      let result: ResumeData | ReactiveResumeV3 | LinkedIn | JsonResume | pdfResume;

      // Determine the parser based on the selected type
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
          // For PDF/DOCX after AI parsing, we treat it as pdfResume for validation
          const parser = new PdfResumeParser();
          result = await parser.validate(data as pdfResume);
          break;
        }
        default: {
          throw new Error("Unsupported import type for validation.");
        }
      }

      setValidationResult({ isValid: true, type, result });
      toast({
        variant: "success",
        title: t`Validation successful!`,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationResult({
          isValid: false,
          errors: error.toString(),
        });

        toast({
          variant: "error",
          title: t`An error occurred while validating the file.`,
          description: error.message,
        });
      } else if (error instanceof Error) {
        setValidationResult({
          isValid: false,
          errors: JSON.stringify({ message: error.message }),
        });
        toast({
          variant: "error",
          title: t`An error occurred during validation.`,
          description: error.message,
        });
      } else {
        setValidationResult({
          isValid: false,
          // eslint-disable-next-line lingui/no-unlocalized-strings
          errors: JSON.stringify({ message: "An unknown error occurred during validation." }),
        });
        toast({
          variant: "error",
          title: t`An unknown error occurred.`,
        });
      }
    }
  };

  const onImport = async () => {
    // We now rely on the 'aiParsedJson' field if it's visible, otherwise fall back to file
    const { type, aiParsedJson, file } = form.getValues();

    if (!validationResult?.isValid) {
      toast({
        variant: "error",
        title: t`Please validate the data first.`,
      });
      return;
    }

    try {
      let dataToConvert: any;
      if (showParsedJson && aiParsedJson) {
        dataToConvert = JSON.parse(aiParsedJson);
      } else if (file) {
        // This path is less likely now if AI parsing is involved for PDF/DOCX
        // but kept for other direct JSON imports.
        if (type === ImportType["reactive-resume-json"]) {
          const parser = new ReactiveResumeParser();
          dataToConvert = await parser.readFile(file);
        } else if (type === ImportType["reactive-resume-v3-json"]) {
          const parser = new ReactiveResumeV3Parser();
          dataToConvert = await parser.readFile(file);
        } else if (type === ImportType["json-resume-json"]) {
          const parser = new JsonResumeParser();
          dataToConvert = await parser.readFile(file);
        } else if (type === ImportType["linkedin-data-export-zip"]) {
          const parser = new LinkedInParser();
          dataToConvert = await parser.readFile(file);
        }
      } else {
        toast({
          variant: "error",
          title: t`No data available to import.`,
        });
        return;
      }

      let finalResumeData: ResumeData;

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
      aiParsedJson: "",
    });
    setValidationResult(null);
    setShowParsedJson(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-xl">
        {" "}
        {/* Adjusted max-width for better display of JSON */}
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
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="reactive-resume-json">
                          Reactive Resume (.json)
                        </SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="reactive-resume-v3-json">
                          Reactive Resume v3 (.json)
                        </SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="json-resume-json">JSON Resume (.json)</SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="linkedin-data-export-zip">
                          LinkedIn Data Export (.zip)
                        </SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
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
                        // If a file is selected, hide the parsed JSON until AI processes it
                        setShowParsedJson(false);
                        form.setValue("aiParsedJson", "");
                        setValidationResult(null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {accept && (
                    <FormDescription>
                      {t({
                        message: `Accepts only ${accept} files`,
                        comment:
                          "Helper text to let the user know what filetypes are accepted. {accept} can be .pdf or .json.",
                      })}
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            {/* New section to display AI parsed JSON */}
            {filetype === ImportType["pdf-docx-doc"] && form.watch("file") && (
              <Button
                type="button"
                onClick={() => {
                  const file = form.getValues("file");
                  if (file) {
                    void onParseWithAI(file);
                  }
                }}
                disabled={loading} // Disable if parsing is in progress
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

            {showParsedJson && (
              <FormField
                name="aiParsedJson"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t`AI Parsed JSON`}</FormLabel>
                    <FormControl>
                      <RichInput
                        {...field}
                        content={aiParsedJsonValue}
                        onChange={(htmlValue: string) => {
                          const plainTextValue = stripHtmlTags(htmlValue);
                          field.onChange(plainTextValue);
                          setValidationResult(null); // Reset validation when user edits
                        }}
                        rows={10} // Adjust rows as needed
                        placeholder={t`Review and amend the AI parsed JSON here...`}
                        className="font-mono text-xs"
                      />
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
              <div className="space-y-2">
                <Label className="text-error">{t`Errors`}</Label>
                <ScrollArea orientation="vertical" className="h-[180px]">
                  <div className="whitespace-pre-wrap rounded bg-secondary-accent p-4 font-mono text-xs leading-relaxed">
                    {JSON.stringify(JSON.parse(validationResult.errors), null, 4)}
                  </div>
                </ScrollArea>
              </div>
            )}

            <DialogFooter>
              <AnimatePresence presenceAffectsLayout>
                {/* Conditionally render Validate button */}
                {(!showParsedJson && !validationResult) ||
                (showParsedJson && !validationResult && aiParsedJsonValue) ||
                (showParsedJson &&
                  validationResult &&
                  !validationResult.isValid &&
                  aiParsedJsonValue) ? (
                  <Button
                    type="button"
                    disabled={
                      loading ||
                      (showParsedJson && !aiParsedJsonValue) ||
                      (!showParsedJson && !form.getValues("file"))
                    }
                    onClick={() => {
                      if (showParsedJson && aiParsedJsonValue) {
                        void onValidate(aiParsedJsonValue); // Validate the textarea content
                      } else {
                        void onValidate(); // Validate the uploaded file
                      }
                    }}
                  >
                    {t`Validate`}
                  </Button>
                ) : null}

                {validationResult !== null && !validationResult.isValid && (
                  <Button type="button" variant="secondary" onClick={onReset}>
                    {t`Discard`}
                  </Button>
                )}

                {validationResult !== null && validationResult.isValid && (
                  <>
                    <Button type="button" disabled={loading} onClick={onImport}>
                      {t`Import`}
                    </Button>

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
