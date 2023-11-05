import { zodResolver } from "@hookform/resolvers/zod";
import { Check, DownloadSimple, Warning } from "@phosphor-icons/react";
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
import { useEffect, useMemo, useState } from "react";
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
}

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
  const { importResume, loading, error: importError } = useImportResume();

  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  const form = useForm<FormValues>({
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
    if (!filetype) return "";
    if (filetype.includes("json")) return ".json";
    if (filetype.includes("zip")) return ".zip";
    return "";
  }, [filetype]);

  const onValidate = async () => {
    const { file, type } = formSchema.parse(form.getValues());

    try {
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
          icon: <Warning size={16} weight="bold" />,
          title: "An error occurred while validating the file.",
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
    } catch (error) {
      toast({
        variant: "error",
        icon: <Warning size={16} weight="bold" />,
        title: "An error occurred while importing your resume.",
        description: importError?.message,
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
        <Form {...form}>
          <form className="space-y-4">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                  <DownloadSimple />
                  <h2>Import an existing resume</h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                Upload a file from an external source to parse an existing resume and import it into
                Reactive Resume for easier editing.
              </DialogDescription>
            </DialogHeader>

            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Please select a file type" />
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
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      key={accept}
                      accept={accept}
                      onChange={(event) => {
                        if (!event.target.files || !event.target.files.length) return;
                        field.onChange(event.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                  {accept && <FormDescription>Accepts only {accept} files</FormDescription>}
                </FormItem>
              )}
            />

            {validationResult?.isValid === false && validationResult.errors !== undefined && (
              <div className="space-y-2">
                <Label className="text-error">Errors during Validation</Label>
                <ScrollArea orientation="vertical" className="h-[180px]">
                  <div className="whitespace-pre-wrap rounded bg-secondary-accent p-4 font-mono text-xs leading-relaxed">
                    {JSON.stringify(validationResult.errors, null, 4)}
                  </div>
                </ScrollArea>
              </div>
            )}

            <DialogFooter>
              <AnimatePresence presenceAffectsLayout>
                {(!validationResult ?? false) && (
                  <Button type="button" onClick={onValidate}>
                    Validate
                  </Button>
                )}

                {validationResult !== null && !validationResult.isValid && (
                  <Button type="button" variant="secondary" onClick={onReset}>
                    Reset
                  </Button>
                )}

                {validationResult !== null && validationResult.isValid && (
                  <>
                    <Button type="button" onClick={onImport} disabled={loading}>
                      Import
                    </Button>

                    <Button disabled type="button" variant="success">
                      <Check size={16} weight="bold" className="mr-2" />
                      Validated
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
