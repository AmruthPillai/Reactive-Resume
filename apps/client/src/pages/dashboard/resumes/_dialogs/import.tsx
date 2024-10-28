import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Check, DownloadSimple } from "@phosphor-icons/react";
import {
  JsonResume,
  JsonResumeParser,
  LinkedIn,
  LinkedInParser,
  ReactiveResumeParser,
  ReactiveResumeV3,
  ReactiveResumeV3Parser,
} from "@reactive-resume/parser";
import { ResumeData } from "@reactive-resume/schema";
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
import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import pdfToText from "react-pdftotext";
import { z, ZodError } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { useImportResume } from "@/client/services/resume/import";
import { useImportPdfResume } from "@/client/services/resume/import-pdf";
import { useDialog } from "@/client/stores/dialog";

function extractText(file: File) {
  try {
    return pdfToText(file);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

enum ImportType {
  "reactive-resume-json" = "reactive-resume-json",
  "reactive-resume-v3-json" = "reactive-resume-v3-json",
  "json-resume-json" = "json-resume-json",
  "linkedin-data-export-zip" = "linkedin-data-export-zip",
  "pdf-resume-file" = "pdf-resume-file",
}

const formSchema = z.object({
  file: z.instanceof(File),
  type: z.nativeEnum(ImportType),
});

type FormValues = z.infer<typeof formSchema>;

type PdfResume = {
  text: string;
  title: string;
};

type ValidationResult =
  | {
      isValid: false;
      errors: string;
    }
  | {
      isValid: true;
      type: ImportType;
      result: ResumeData | ReactiveResumeV3 | LinkedIn | JsonResume | PdfResume;
    };

export const ImportDialog = () => {
  const [convertLoading, setConvertLoading] = useState(false);
  const { toast } = useToast();
  const { isOpen, close } = useDialog("import");
  const { importResume, loading } = useImportResume();
  const { importPdfResume, loading: loadingPdf } = useImportPdfResume();
  const textRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      type: ImportType["reactive-resume-json"],
    },
    resolver: zodResolver(formSchema),
  });
  const filetype = form.watch("type");

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen]);

  useEffect(() => {
    form.reset({ file: undefined, type: filetype });
    setValidationResult(null);
  }, [filetype]);

  useEffect(() => {
    if (validationResult?.isValid) {
      inputRef.current?.focus();
    }
  }, [validationResult]);

  const accept = useMemo(() => {
    if (filetype.includes("json")) return ".json";
    if (filetype.includes("zip")) return ".zip";
    if (filetype.includes("pdf")) return ".pdf";
    return "";
  }, [filetype]);

  const onValidate = async () => {
    try {
      const { file, type } = formSchema.parse(form.getValues());

      if (type === ImportType["reactive-resume-json"]) {
        const parser = new ReactiveResumeParser();
        const data = await parser.readFile(file);
        const result = parser.validate(data);

        setValidationResult({ isValid: true, type, result });
      }

      if (type === ImportType["reactive-resume-v3-json"]) {
        const parser = new ReactiveResumeV3Parser();
        const data = await parser.readFile(file);
        const result = parser.validate(data);

        setValidationResult({ isValid: true, type, result });
      }

      if (type === ImportType["json-resume-json"]) {
        const parser = new JsonResumeParser();
        const data = await parser.readFile(file);
        const result = parser.validate(data);

        setValidationResult({ isValid: true, type, result });
      }

      if (type === ImportType["linkedin-data-export-zip"]) {
        const parser = new LinkedInParser();
        const data = await parser.readFile(file);
        const result = await parser.validate(data);

        setValidationResult({ isValid: true, type, result });
      }

      if (type === ImportType["pdf-resume-file"]) {
        setConvertLoading(true);
        const text = await extractText(file);
        setValidationResult({
          isValid: true,
          type,
          result: {
            text,
            title: file.name.split(".pdf")[0],
          },
        });
        textRef.current = text;
        setConvertLoading(false);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setValidationResult({
          isValid: false,
          errors: error.toString(),
        });

        toast({
          variant: "error",
          title: t`An error occurred while validating the file.`,
        });
      }
    }
  };

  const onImport = async () => {
    const { type } = formSchema.parse(form.getValues());

    if (!validationResult?.isValid || validationResult.type !== type) return;

    try {
      if (type === ImportType["reactive-resume-json"]) {
        const parser = new ReactiveResumeParser();
        const data = parser.convert(validationResult.result as ResumeData);

        await importResume({ data });
      }

      if (type === ImportType["reactive-resume-v3-json"]) {
        const parser = new ReactiveResumeV3Parser();
        const data = parser.convert(validationResult.result as ReactiveResumeV3);

        await importResume({ data });
      }

      if (type === ImportType["json-resume-json"]) {
        const parser = new JsonResumeParser();
        const data = parser.convert(validationResult.result as JsonResume);

        await importResume({ data });
      }

      if (type === ImportType["linkedin-data-export-zip"]) {
        const parser = new LinkedInParser();
        const data = parser.convert(validationResult.result as LinkedIn);

        await importResume({ data });
      }

      if (type === ImportType["pdf-resume-file"]) {
        await importPdfResume({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          data: textRef.current!,
          title: (validationResult.result as PdfResume).title,
        });
      }
      close();
    } catch (error: unknown) {
      if (filetype === ImportType["pdf-resume-file"]) {
        setValidationResult({
          isValid: false,
          errors: (error as Error).message,
        });
        return;
      }
      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  const onReset = () => {
    form.reset();
    setValidationResult(null);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Dialog open={loadingPdf ? true : isOpen} onOpenChange={loadingPdf ? () => {} : close}>
      <DialogContent>
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
                {t`Upload a file from one of the accepted sources to parse existing data and import it into Talent Hub for easier editing.`}
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
                        <SelectItem value="reactive-resume-json">Talent Hub (.json)</SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="reactive-resume-v3-json">
                          Talent Hub v3 (.json)
                        </SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="json-resume-json">JSON Resume (.json)</SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="linkedin-data-export-zip">
                          LinkedIn Data Export (.zip)
                        </SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="pdf-resume-file">PDF Resume File (.pdf)</SelectItem>
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
                      disabled={
                        validationResult?.isValid && filetype === ImportType["pdf-resume-file"]
                      }
                      accept={accept}
                      onChange={(event) => {
                        if (!event.target.files?.length) return;
                        field.onChange(event.target.files[0]);
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

            {validationResult?.isValid === false && (
              <div className="space-y-2">
                <Label className="text-error">{t`Errors`}</Label>
                <ScrollArea orientation="vertical" className="h-[180px]">
                  <div className="whitespace-pre-wrap rounded bg-secondary-accent p-4 font-mono text-xs leading-relaxed">
                    {form.getValues().type === ImportType["pdf-resume-file"]
                      ? validationResult.errors
                      : JSON.stringify(JSON.parse(validationResult.errors), null, 4)}
                  </div>
                </ScrollArea>
              </div>
            )}

            {validationResult?.isValid && filetype === ImportType["pdf-resume-file"] && (
              <div className="mt-2 flex flex-col space-y-2">
                <Label className="text-primary">{t`Modify`}</Label>
                <textarea
                  ref={inputRef}
                  rows={5}
                  className="text-black"
                  defaultValue={(validationResult.result as PdfResume).text}
                  disabled={loading || loadingPdf || convertLoading}
                  onChange={(e) => (textRef.current = e.target.value)}
                />
              </div>
            )}

            <DialogFooter>
              <AnimatePresence presenceAffectsLayout>
                {!validationResult && (
                  <Button
                    type="button"
                    disabled={loading || loadingPdf || convertLoading}
                    onClick={onValidate}
                  >
                    {filetype === ImportType["pdf-resume-file"] ? t`Modify` : t`Validate`}
                  </Button>
                )}

                {validationResult !== null && !validationResult.isValid && (
                  <Button type="button" variant="secondary" onClick={onReset}>
                    {t`Discard`}
                  </Button>
                )}

                {validationResult !== null && validationResult.isValid && (
                  <>
                    <Button
                      type="button"
                      disabled={loading || loadingPdf || convertLoading}
                      onClick={onImport}
                    >
                      {loading || loadingPdf || convertLoading ? t`Loading...` : t`Import`}
                    </Button>

                    {filetype !== ImportType["pdf-resume-file"] && (
                      <Button disabled type="button" variant="success">
                        <Check size={16} weight="bold" className="mr-2" />
                        {t`Validated`}
                      </Button>
                    )}
                  </>
                )}
                {/* </>
                )} */}
              </AnimatePresence>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
