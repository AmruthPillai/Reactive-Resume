import { zodResolver } from "@hookform/resolvers/zod";
import { CaretDown, MagicWand, Plus, TestTube } from "@phosphor-icons/react";
import { createResumeSchema, ResumeDto } from "@reactive-resume/dto";
import { idSchema } from "@reactive-resume/schema";
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
  Tooltip,
} from "@reactive-resume/ui";
import { generateRandomName, kebabCase } from "@reactive-resume/utils";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { sampleResume } from "@/client/constants/sample-resume";
import { useToast } from "@/client/hooks/use-toast";
import { useCreateResume, useDeleteResume, useUpdateResume } from "@/client/services/resume";
import { useImportResume } from "@/client/services/resume/import";
import { useDialog } from "@/client/stores/dialog";

const formSchema = createResumeSchema.extend({ id: idSchema.optional() });

type FormValues = z.infer<typeof formSchema>;

export const ResumeDialog = () => {
  const { toast } = useToast();
  const { isOpen, mode, payload, close } = useDialog<ResumeDto>("resume");

  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";
  const isDuplicate = mode === "duplicate";

  const { createResume, loading: createLoading } = useCreateResume();
  const { updateResume, loading: updateLoading } = useUpdateResume();
  const { deleteResume, loading: deleteLoading } = useDeleteResume();
  const { importResume: duplicateResume, loading: duplicateLoading } = useImportResume();

  const loading = createLoading || updateLoading || deleteLoading || duplicateLoading;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", slug: "" },
  });

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen, payload]);

  useEffect(() => {
    const slug = kebabCase(form.watch("title"));
    form.setValue("slug", slug);
  }, [form.watch("title")]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isCreate) {
        await createResume({ slug: values.slug, title: values.title, visibility: "private" });
      }

      if (isUpdate) {
        if (!payload.item?.id) return;

        await updateResume({
          ...payload.item,
          title: values.title,
          slug: values.slug,
        });
      }

      if (isDuplicate) {
        if (!payload.item?.id) return;

        await duplicateResume({
          title: values.title,
          slug: values.slug,
          data: payload.item.data,
        });
      }

      if (isDelete) {
        if (!payload.item?.id) return;

        await deleteResume({ id: payload.item?.id });
      }

      close();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;

        toast({
          variant: "error",
          title: "An error occurred while trying process your request.",
          description: message,
        });
      }
    }
  };

  const onReset = () => {
    if (isCreate) form.reset({ title: "", slug: "" });
    if (isUpdate)
      form.reset({ id: payload.item?.id, title: payload.item?.title, slug: payload.item?.slug });
    if (isDuplicate)
      form.reset({ title: `${payload.item?.title} (Copy)`, slug: `${payload.item?.slug}-copy` });
    if (isDelete)
      form.reset({ id: payload.item?.id, title: payload.item?.title, slug: payload.item?.slug });
  };

  const onGenerateRandomName = () => {
    const name = generateRandomName();
    form.setValue("title", name);
    form.setValue("slug", kebabCase(name));
  };

  const onCreateSample = async () => {
    const randomName = generateRandomName();
    const { title, slug } = form.getValues();

    await duplicateResume({
      title: title || randomName,
      slug: slug || kebabCase(randomName),
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
                <AlertDialogTitle>Are you sure you want to delete your resume?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your resume and cannot
                  be recovered.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <AlertDialogAction variant="error" onClick={form.handleSubmit(onSubmit)}>
                  Delete
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
      <DialogContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                  <Plus />
                  <h2>
                    {isCreate && "Create a new resume"}
                    {isUpdate && "Update an existing resume"}
                    {isDuplicate && "Duplicate an existing resume"}
                  </h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                {isCreate && "Start building your resume by giving it a name."}
                {isUpdate && "Changed your mind about the name? Give it a new one."}
                {isDuplicate && "Give your old resume a new name."}
              </DialogDescription>
            </DialogHeader>

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-2">
                      <Input {...field} className="flex-1" />

                      {(isCreate || isDuplicate) && (
                        <Tooltip content="Generate a random name">
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
                    Tip: You can name the resume referring to the position you are applying for.
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
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <div className="flex items-center">
                <Button type="submit" disabled={loading} className="rounded-r-none">
                  {isCreate && "Create"}
                  {isUpdate && "Save Changes"}
                  {isDuplicate && "Duplicate"}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button type="button" size="icon" className="rounded-l-none border-l">
                      <CaretDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="center">
                    <DropdownMenuItem onClick={onCreateSample}>
                      <TestTube className="mr-2" />
                      Create Sample Resume
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
