import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { MagicWand, Plus, Spinner } from "@phosphor-icons/react";
import {
  createResumeSchema,
  OnboardingLinkedinDto,
  onboardingLinkedinSchema,
} from "@reactive-resume/dto";
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
  Textarea,
  Tooltip,
} from "@reactive-resume/ui";
import { generateRandomName, kebabCase } from "@reactive-resume/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/client/hooks/use-toast";
import { useCreateAiResume } from "@/client/services/resume";
import { useImportLinkedinResume } from "@/client/services/resume/import-linkedin";
import { fetchOnboardingLinkedin } from "@/client/services/user";
import { useDialog } from "@/client/stores/dialog";

const formSchema = z.object({
  ...createResumeSchema.shape,
  ...onboardingLinkedinSchema.shape,
});

type FormValues = z.infer<typeof formSchema>;

const isEnglishWithSpaces = (title: string) => {
  return /^[\sA-Za-z]+$/.test(title);
};

export const OnboardingAiDialog = () => {
  const { isOpen, close } = useDialog<OnboardingLinkedinDto[]>("onboarding-ai");
  const { importLinkedinResume, loading: importLinkedinLoading } = useImportLinkedinResume();
  const { createAiResume, loading: createAiLoading } = useCreateAiResume();
  const { toast } = useToast();
  const loading = createAiLoading || importLinkedinLoading;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      linkedinUrl: "",
      jobDescription: "",
    },
  });

  useEffect(() => {
    const onboardingLinkedinId = localStorage.getItem("onboardingLinkedinId");
    if (onboardingLinkedinId) {
      void fetchOnboardingLinkedin(onboardingLinkedinId).then((data) => {
        form.reset({
          linkedinUrl: data.linkedinUrl,
          jobDescription: data.jobDescription,
        });
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isEnglishWithSpaces(form.watch("title"))) {
      const slug = kebabCase(form.watch("title"));
      form.setValue("slug", slug);
    } else {
      const slug = kebabCase(generateRandomName());
      form.setValue("slug", slug);
    }
  }, [form.watch("title")]);

  const onSubmit = async (values: FormValues) => {
    const resume = await importLinkedinResume({
      linkedinURL: values.linkedinUrl,
    });

    await createAiResume({
      slug: values.slug,
      title: values.title,
      visibility: "private",
      existingResumeId: resume.id,
      jobDescription: values.jobDescription,
    });
    //localStorage.removeItem("onboardingLinkedinId");

    close();
  };

  const onGenerateRandomName = () => {
    const name = generateRandomName();
    form.setValue("title", name);
    form.setValue("slug", kebabCase(name));
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-2.5">
                  <Plus />
                  <h2>{t`Create a resume with AI`}</h2>
                </div>
              </DialogTitle>
              <DialogDescription>{t`Let the AI do the work`}</DialogDescription>
            </DialogHeader>

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Title`}</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Input {...field} className="flex-1" />

                      <Tooltip content={t`Generate a random title for your resume`}>
                        <Button
                          size="icon"
                          type="button"
                          variant="outline"
                          onClick={onGenerateRandomName}
                        >
                          <MagicWand />
                        </Button>
                      </Tooltip>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {t`Tip: You can name the resume referring to the position you are applying for.`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="slug"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Slug`}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="linkedinUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`LinkedIn Profile URL`}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      placeholder="https://www.linkedin.com/in/ryanroslansky/"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="jobDescription"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Job Description`}</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled className="min-h-[200px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex items-center">
                <Button type="submit" disabled={loading} className="rounded-r-none">
                  {loading && <Spinner className="me-2 animate-spin" />}
                  {t`Create`}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
