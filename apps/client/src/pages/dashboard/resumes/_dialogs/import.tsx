import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Check, DownloadSimple, Spinner } from "@phosphor-icons/react";
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
  Separator,
} from "@reactive-resume/ui";
import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { useImportResume } from "@/client/services/resume/import";
import { useImportLinkedinResume } from "@/client/services/resume/import-linkedin";
import { useSubscription } from "@/client/services/user";
import { useDialog } from "@/client/stores/dialog";

enum ImportType {
  "reactive-resume-json" = "reactive-resume-json",
  "reactive-resume-v3-json" = "reactive-resume-v3-json",
  "json-resume-json" = "json-resume-json",
  "linkedin-data-export-zip" = "linkedin-data-export-zip",
}

const formLinkedinSchema = z.object({
  linkedinUrl: z
    .string()
    .url()
    .refine((value) => value.includes("linkedin.com/in/")),
});

type FormLinkedinValues = z.infer<typeof formLinkedinSchema>;

const formSchema = z.object({
  file: z.instanceof(File),
  type: z.nativeEnum(ImportType),
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
      result: ResumeData | ReactiveResumeV3 | LinkedIn | JsonResume;
    };

export const ImportDialog = () => {
  const { toast } = useToast();
  const { isOpen, close } = useDialog("import");
  const { importResume, loading: importLoading } = useImportResume();
  const { importLinkedinResume, loading: importLinkedinLoading } = useImportLinkedinResume();
  const subscription = useSubscription();

  const loading = importLoading || importLinkedinLoading;
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const linkedinForm = useForm<FormLinkedinValues>({
    defaultValues: {
      linkedinUrl: "",
    },
    resolver: zodResolver(formLinkedinSchema),
  });

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

  const accept = useMemo(() => {
    if (filetype.includes("json")) return ".json";
    if (filetype.includes("zip")) return ".zip";
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

  const onLinkedinImport = async () => {
    try {
      const { linkedinUrl } = formLinkedinSchema.parse(linkedinForm.getValues());
      await importLinkedinResume({ linkedinURL: linkedinUrl });
      close();
    } catch (error) {
      if (error instanceof ZodError) {
        toast({
          variant: "error",
          title: t`An error occurred while validating the LinkedIn URL.`,
        });
      } else if (error instanceof Error) {
        toast({
          variant: "error",
          title: t`Oops, the server returned an error.`,
          description: error.message,
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
    form.reset();
    setValidationResult(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2.5">
              <DownloadSimple />
              <h2>{t`Import an existing resume`}</h2>
            </div>
          </DialogTitle>
          <DialogDescription>
            {t`Upload a file from one of the accepted sources to parse existing data and import it into TechCV for easier editing.`}
          </DialogDescription>
        </DialogHeader>

        <Form {...linkedinForm}>
          <form className="space-y-4">
            <FormField
              name="linkedinUrl"
              control={linkedinForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`LinkedIn Profile URL`}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://www.linkedin.com/in/ryanroslansky/" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {!subscription.isPro && (
          <div className="flex justify-end gap-2">
            <Button type="button" disabled={loading} onClick={console.log}>
              {loading && <Spinner size={16} className="me-2 animate-spin" />}
              {t`Upgrade`}
            </Button>
          </div>
        )}

        {subscription.isPro && (
          <div className="flex justify-end gap-2">
            <Button type="button" disabled={loading} onClick={onLinkedinImport}>
              {loading && <Spinner size={16} className="me-2 animate-spin" />}
              {t`Import`}
            </Button>
          </div>
        )}

        <Separator />

        <Form {...form}>
          <form className="space-y-4">
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
                        <SelectItem value="reactive-resume-json">TechCV (.json)</SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="reactive-resume-v3-json">TechCV v3 (.json)</SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="json-resume-json">JSON Resume (.json)</SelectItem>
                        {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
                        <SelectItem value="linkedin-data-export-zip">
                          LinkedIn Data Export (.zip)
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
                    {JSON.stringify(JSON.parse(validationResult.errors), null, 4)}
                  </div>
                </ScrollArea>
              </div>
            )}

            <DialogFooter>
              <AnimatePresence presenceAffectsLayout>
                {!validationResult && (
                  <Button type="button" onClick={onValidate}>
                    {t`Validate`}
                  </Button>
                )}

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
                      <Check size={16} weight="bold" className="me-2" />
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
