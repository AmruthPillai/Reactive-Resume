import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { CaretDown, Flask, MagicWand, Plus } from "@phosphor-icons/react";
import { createResumeSchema, ResumeDto } from "@reactive-resume/dto";
import { idSchema, sampleResume } from "@reactive-resume/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Tooltip,
} from "@reactive-resume/ui";
import { cn, generateRandomName, kebabCase } from "@reactive-resume/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  useCreateAiResume,
  useCreateResume,
  useDeleteResume,
  useUpdateResume,
} from "@/client/services/resume";
import { useImportResume } from "@/client/services/resume/import";
import { useDialog } from "@/client/stores/dialog";

const formSchema = createResumeSchema.extend({
  id: idSchema.optional(),
  existingResumeId: z.string().min(1).optional(),
  jobDescription: z.string().min(1).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ResumeDialog = () => {
  const { isOpen, mode, payload, close } = useDialog<ResumeDto[]>("resume");

  const isCreateAi = mode === "create-ai";
  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";
  const isDuplicate = mode === "duplicate";

  const { createAiResume, loading: createAiLoading } = useCreateAiResume();
  const { createResume, loading: createLoading } = useCreateResume();
  const { updateResume, loading: updateLoading } = useUpdateResume();
  const { deleteResume, loading: deleteLoading } = useDeleteResume();
  const { importResume: duplicateResume, loading: duplicateLoading } = useImportResume();

  const loading =
    createLoading || createAiLoading || updateLoading || deleteLoading || duplicateLoading;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      existingResumeId: "",
      jobDescription: "",
    },
  });

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen, payload]);

  useEffect(() => {
    const slug = kebabCase(form.watch("title"));
    form.setValue("slug", slug);
  }, [form.watch("title")]);

  const onSubmit = async (values: FormValues) => {
    if (isCreateAi) {
      await createAiResume({
        slug: values.slug,
        title: values.title,
        visibility: "private",
        existingResumeId: values.existingResumeId,
        jobDescription: values.jobDescription,
      });
    }

    if (isCreate) {
      await createResume({ slug: values.slug, title: values.title, visibility: "private" });
    }

    if (isUpdate) {
      if (!payload.item?.[0].id) return;

      await updateResume({
        ...payload.item[0],
        title: values.title,
        slug: values.slug,
      });
    }

    if (isDuplicate) {
      if (!payload.item?.[0].id) return;

      await duplicateResume({
        title: values.title,
        slug: values.slug,
        data: payload.item[0].data,
      });
    }

    if (isDelete) {
      if (!payload.item?.[0].id) return;

      await deleteResume({ id: payload.item[0].id });
    }

    close();
  };

  const onReset = () => {
    if (isCreateAi)
      form.reset({
        title: "",
        slug: "",
        existingResumeId: "",
        jobDescription: "",
      });
    if (isCreate) form.reset({ title: "", slug: "" });
    if (isUpdate)
      form.reset({
        id: payload.item?.[0]?.id,
        title: payload.item?.[0]?.title,
        slug: payload.item?.[0]?.slug,
      });
    if (isDuplicate)
      form.reset({
        title: `${payload.item?.[0]?.title} (Copy)`,
        slug: `${payload.item?.[0]?.slug}-copy`,
      });
    if (isDelete)
      form.reset({
        id: payload.item?.[0]?.id,
        title: payload.item?.[0]?.title,
        slug: payload.item?.[0]?.slug,
      });
  };

  const onGenerateRandomName = () => {
    const name = generateRandomName();
    form.setValue("title", name);
    form.setValue("slug", kebabCase(name));
  };

  const onCreateSample = async () => {
    const randomName = generateRandomName();

    await duplicateResume({
      title: randomName,
      slug: kebabCase(randomName),
      data: sampleResume,
    });

    close();
  };

  if (isDelete) {
    return (
      <AlertDialog open={isOpen} onOpenChange={close}>
        <AlertDialogContent>
          <Form {...form}>
            <form>
              <AlertDialogHeader>
                <AlertDialogTitle>{t`Are you sure you want to delete your resume?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t`This action cannot be undone. This will permanently delete your resume and cannot be recovered.`}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>{t`Cancel`}</AlertDialogCancel>
                <AlertDialogAction variant="error" onClick={form.handleSubmit(onSubmit)}>
                  {t`Delete`}
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-h-screen overflow-y-scroll">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-2.5">
                  <Plus />
                  <h2>
                    {isCreateAi && t`Create a resume with AI`}
                    {isCreate && t`Create a new resume`}
                    {isUpdate && t`Update an existing resume`}
                    {isDuplicate && t`Duplicate an existing resume`}
                  </h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                {isCreateAi && t`Let the AI do the work`}
                {isCreate && t`Start building your resume by giving it a name.`}
                {isUpdate && t`Changed your mind about the name? Give it a new one.`}
                {isDuplicate && t`Give your old resume a new name.`}
              </DialogDescription>
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

                      {(isCreate || isCreateAi || isDuplicate) && (
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
                      )}
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isCreateAi && (
              <>
                <FormField
                  name="existingResumeId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t`Resume`}</FormLabel>
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder={t`Please select an existing resume`} />
                          </SelectTrigger>
                          <SelectContent>
                            {payload.item?.map((resume: ResumeDto) => (
                              <SelectItem key={resume.id} value={resume.id}>
                                {resume.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter>
              <div className="flex items-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className={cn((isCreate || isCreateAi) && "rounded-r-none")}
                >
                  {isCreateAi && t`Create`}
                  {isCreate && t`Create`}
                  {isUpdate && t`Save Changes`}
                  {isDuplicate && t`Duplicate`}
                </Button>

                {isCreate && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" size="icon" className="rounded-s-none border-s">
                        <CaretDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="center">
                      <DropdownMenuItem onClick={onCreateSample}>
                        <Flask className="me-2" />
                        {t`Create Sample Resume`}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
