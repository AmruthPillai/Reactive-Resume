/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-dynamic-delete */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable lingui/text-restrictions */
/* eslint-disable lingui/no-unlocalized-strings */
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Check, DownloadSimple, FlowArrow } from "@phosphor-icons/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  JsonResume,
  JsonResumeParser,
  LinkedIn,
  LinkedInParser,
  ReactiveResumeParser,
  ReactiveResumeV3,
  ReactiveResumeV3Parser,
} from "@reactive-resume/parser";
import { ResumeData, resumeDataSchema } from "@reactive-resume/schema";
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
import { generateRandomName, kebabCase } from "@reactive-resume/utils";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import pdfToText from "react-pdftotext";
import { z, ZodError } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { useImportResume } from "@/client/services/resume/import";
import { importPdfResume } from "@/client/services/resume/import-pdf";
import { useDialog } from "@/client/stores/dialog";
import { extractKeysArray, mappingValue } from "@/client/util/mapping"

import { schemaMappingData } from "./data";

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

type AnyObject = Record<string, unknown>;

const MappingRow = ({
  keyRight,
  keyLeftArray,
  mappingCode,
  setMappingCode
}: {
  keyRight: {
    name: string;
    path: string;
  };
  keyLeftArray: (string | string[])[];
  mappingCode: Record<string, string>;
  setMappingCode: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) => {
  const [keyText, setKeyText] = useState(mappingCode[keyRight.path] || "");

  const handleChange = (value: string) => {
    if (value) {
      setMappingCode((prev) => ({
        ...prev,
        [keyRight.path]: value,
      }));
    } else {
      setMappingCode((prev) => {
        const { [keyRight.path]: _, ...rest } = prev;
        return rest;
      });
    }
    setKeyText(value);
  };

  return (
    <div
      key={keyRight.name}
      className="grid grid-cols-3 items-center gap-4 border-b-2 px-2 pb-4 pt-2"
    >
      <Input
        value={keyText}
        style={{
          borderColor:
            keyLeftArray.flat(Infinity).includes(keyText) || !keyText ? "inherit" : "red",
        }}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <ArrowRight className="justify-self-center" />
      <p className="text-right capitalize">{keyRight.name}</p>
    </div>
  );
};

export const ImportDialog = () => {
  const [convertLoading, setConvertLoading] = useState(false);
  const [pdfState, setPdfState] = useState<'none' | "data">("none");
  const [mappingCode, setMappingCode] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { isOpen, close } = useDialog("import");
  const { importResume, loading } = useImportResume();
  const textRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const pdfDataRef = useRef<null | AnyObject>(null);
  const [pdfJson, setPdfJson] = useState<null | string>(null);
  const titleRef = useRef<null | string>(null);
  const okRef = useRef<boolean>(false);
  const objRef = useRef<AnyObject>({});

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

  useEffect(() => {
    setValidationResult(null);
  }, [mappingCode]);

  const accept = useMemo(() => {
    if (filetype.includes("json")) return ".json";
    if (filetype.includes("zip")) return ".zip";
    if (filetype.includes("pdf")) return ".pdf";
    return "";
  }, [filetype]);

  const keysLeft = useMemo(() => extractKeysArray(objRef.current), [objRef.current]);

  const validCheck = useMemo(() => {
    return Object.values(mappingCode).every(code => keysLeft.flat(Infinity).includes(code));
  }, [mappingCode]);

  const checkTextarea = useMemo(() => {
    try {
      const obj = JSON.parse(pdfJson as unknown as string);
      objRef.current = obj;
      return true;
    } catch {
      objRef.current = {};
      return false;
    }
  }, [pdfJson])


  const onParse = async () => {
    try {
      const { file, type } = formSchema.parse(form.getValues());
      setConvertLoading(true);
      const text = await extractText(file);
      // setValidationResult({
      //   isValid: true,
      //   type,
      //   result: {
      //     text,
      //     title: file.name.split(".pdf")[0],
      //   },
      // });
      titleRef.current = file.name.split(".pdf")[0];
      textRef.current = text;
      okRef.current = true;
      setConvertLoading(false);
    } catch (error) {
      if (error instanceof ZodError) {
        toast({
          variant: "error",
          title: t`An error occurred while validating the file.`,
        });
      }
    }
  }

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
        const result = mappingValue(pdfDataRef.current!, mappingCode);
        resumeDataSchema.parse(result);
        // throw new Error('Errro')
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
        const title = titleRef.current ?? generateRandomName();
        await importResume({
          data: validationResult.result as ResumeData,
          title: title,
          slug: kebabCase(title),
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

  const transformPdf = async () => {
    try {
      setConvertLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const response = await importPdfResume(textRef.current!);
      console.log(response);
      pdfDataRef.current = response;
      objRef.current = response;
      setConvertLoading(false);
      setPdfState("data");
    } catch (error: unknown) {
      setConvertLoading(false);
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
    pdfDataRef.current = null;
    setPdfState("none");
    setMappingCode({});
    textRef.current = null;
    inputRef.current = null;
    titleRef.current = null;
    okRef.current = false;
  };

  const noneState = () => (
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
                    <SelectItem value="reactive-resume-v3-json">Talent Hub v3 (.json)</SelectItem>
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
                  disabled={validationResult?.isValid && filetype === ImportType["pdf-resume-file"]}
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

        {textRef.current && titleRef.current && filetype === ImportType["pdf-resume-file"] && (
          <div className="mt-2 flex flex-col space-y-2">
            <Label className="text-primary">{t`Modify`}</Label>
            <textarea
              ref={inputRef}
              rows={5}
              className="text-black"
              defaultValue={textRef.current}
              disabled={loading || convertLoading}
              onChange={(e) => (textRef.current = e.target.value)}
            />
          </div>
        )}
        <DialogFooter>
          <AnimatePresence presenceAffectsLayout>
            {((filetype !== ImportType["pdf-resume-file"] && !validationResult) || (filetype === ImportType["pdf-resume-file"] && !okRef.current)) && (
              <Button type="button" disabled={loading || convertLoading} onClick={filetype === ImportType["pdf-resume-file"] ? onParse : onValidate}>
                {filetype === ImportType["pdf-resume-file"] ? t`Modify` : t`Validate`}
              </Button>
            )}

            {validationResult !== null && !validationResult.isValid && (
              <Button type="button" variant="secondary" onClick={onReset}>
                {t`Discard`}
              </Button>
            )}

            {validationResult !== null &&
              validationResult.isValid &&
              filetype !== ImportType["pdf-resume-file"] && (
                <>
                  <Button type="button" disabled={loading || convertLoading} onClick={onImport}>
                    {loading || convertLoading ? t`Loading...` : t`Import`}
                  </Button>

                  <Button disabled type="button" variant="success">
                    <Check size={16} weight="bold" className="mr-2" />
                    {t`Validated`}
                  </Button>
                </>
              )}

            {!!okRef.current && filetype === ImportType["pdf-resume-file"] && (
              <Button type="button" disabled={loading || convertLoading} onClick={transformPdf}>
                {loading || convertLoading ? t`Loading...` : t`Transform`}
              </Button>
            )}
          </AnimatePresence>
        </DialogFooter>
      </form>
    </Form>
  );

  const pdfLayout = () => (
    <div className="flex flex-col overflow-hidden">
      <DialogHeader>
        <DialogTitle>
          <div className="flex items-center space-x-2.5">
            <FlowArrow />
            <h2 onClick={() => { setMappingCode({}) }}>{t`Resume Mapping`}</h2>
          </div>
        </DialogTitle>
      </DialogHeader>
      {/* <div className="flex w-full justify-between py-4">
        <p
          className="cursor-pointer"
          style={{ color: pdfState === "preview" ? "rgb(175, 205, 255)" : "inherit" }}
          onClick={() => {
            setPdfState("preview");
          }}
        >{t`Preview`}</p>
      </div> */}
      {validationResult?.isValid === false && (
        <div className="space-y-2">
          <Label className="text-error">{t`Errors`}</Label>
          <ScrollArea orientation="vertical" className="h-[120px]">
            <div className="whitespace-pre-wrap rounded bg-secondary-accent p-4 font-mono text-xs leading-relaxed">
              {validationResult.errors}
            </div>
          </ScrollArea>
        </div>
      )}
      <div className="grid grow grid-cols-3 gap-16 overflow-hidden py-8">
        {/* <div className="overflow-hidden"> */}
        <div className="space-y-2 overflow-auto flex flex-col gap-4">
          <Label className=" text-[inherit]">{t`Your CV Data`}</Label>
          {/* <p className="break-words">{JSON.stringify(extractKeysArray(pdfDataRef.current!))}</p> */}
          {/* <div className="whitespace-pre-wrap rounded bg-secondary-accent p-4 font-mono text-xs leading-relaxed">
              {JSON.stringify(pdfDataRef.current, null, 4)}
            </div> */}
          <textarea
            className="block size-full whitespace-pre-wrap bg-secondary-accent font-mono text-xs leading-relaxed outline-none"
            defaultValue={JSON.stringify(pdfDataRef.current, null, 4)}
            style={{
              border: checkTextarea ? "none" : "1px solid red",
            }}
            onChange={(e) => {
              setPdfJson(e.target.value);
            }}
          />
        </div>
        {/* </div> */}
        <div className="space-y-2 overflow-auto flex flex-col gap-4">
          <Label className="text-[inherit] ">{t`Mapping`}</Label>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-4 border-b-2 py-2">
              <p className="font-bold text-[inherit]">{t`Field`}</p>
              <p className="font-bold text-[inherit]"></p>
              <p className="text-right font-bold text-[inherit]">{t`Map`}</p>
            </div>
            {schemaMappingData.map((schema) => (
              <MappingRow
                key={schema.name}
                keyLeftArray={keysLeft}
                keyRight={schema}
                mappingCode={mappingCode}
                setMappingCode={setMappingCode}
              />
            ))}
          </div>
        </div>
        <div className="space-y-2 overflow-auto flex flex-col gap-4">
          <Label className="text-[inherit] ">{t`Techhub Output`}</Label>
          <ScrollArea orientation="vertical">
            <div className="whitespace-pre-wrap rounded bg-secondary-accent p-4 font-mono text-xs leading-relaxed">
              {JSON.stringify(mappingValue(objRef.current, mappingCode), null, 4)}
            </div>
          </ScrollArea>
        </div>
      </div>
      <DialogFooter>
        <AnimatePresence presenceAffectsLayout>
          {!validationResult && (
            <Button type="button" disabled={!validCheck || !checkTextarea || loading || convertLoading} onClick={onValidate}>
              {t`Validate`}
            </Button>
          )}

          {/* {console.warn(validationResult)} */}

          {validationResult !== null && !validationResult.isValid && (
            <Button type="button" variant="secondary" onClick={onReset}>
              {t`Discard`}
            </Button>
          )}

          {validationResult !== null && validationResult.isValid && (
            <>
              <Button type="button" disabled={loading || convertLoading} onClick={onImport}>
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
    </div>
  );

  const previewState = (
    <></>
  )

  const stateMap = {
    none: noneState(),
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    data: pdfLayout(),
    // mapping: pdfLayout(mappingState),
    // output: pdfLayout(outputState),
    // preview: pdfLayout(previewState),
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Dialog
      // open={true}
      open={convertLoading ? true : isOpen}
      onOpenChange={convertLoading ? () => { } : close}
    >
      <DialogContent style={{ maxWidth: pdfState === "none" ? "56rem" : "96vw", height: pdfState === "none" ? "unset" : "88vh" }}>
        {stateMap[pdfState]}
      </DialogContent>
    </Dialog>
  );
};
