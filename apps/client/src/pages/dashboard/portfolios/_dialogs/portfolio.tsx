import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "@lingui/macro";
import { Plus, CopySimple, TrashSimple } from "@phosphor-icons/react";
import { createPortfolioSchema, PortfolioDto } from "@reactive-resume/dto";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@reactive-resume/ui";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreatePortfolio, useDeletePortfolio, useUpdatePortfolio } from "@/client/services/portfolio";
import { useDialog } from "@/client/stores/dialog";

const formSchema = createPortfolioSchema;

type FormValues = z.infer<typeof formSchema>;

export const PortfolioDialog = () => {
  const { isOpen, mode, payload, close } = useDialog<PortfolioDto>("portfolio");

  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";
  const isDuplicate = mode === "duplicate";

  const { createPortfolio, loading: createLoading } = useCreatePortfolio();
  const { updatePortfolio, loading: updateLoading } = useUpdatePortfolio();
  const { deletePortfolio, loading: deleteLoading } = useDeletePortfolio();

  const loading = createLoading || updateLoading || deleteLoading;

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
    if (isCreate) {
      await createPortfolio({ slug: values.slug, title: values.title, visibility: "private" });
    }

    if (isUpdate) {
      if (!payload.item?.id) return;

      await updatePortfolio({
        ...payload.item,
        title: values.title,
        slug: values.slug,
      });
    }

    if (isDuplicate) {
      if (!payload.item?.id) return;

      await createPortfolio({
        title: values.title,
        slug: values.slug,
        data: payload.item.data,
      });
    }

    if (isDelete) {
      if (!payload.item?.id) return;

      await deletePortfolio({ id: payload.item.id });
    }

    close();
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

  if (isDelete) {
    return (
      <AlertDialog open={isOpen} onOpenChange={close}>
        <AlertDialogContent>
          <Form {...form}>
            <form>
              <AlertDialogHeader>
                <AlertDialogTitle>{t`Are you sure you want to delete your portfolio?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t`This action cannot be undone. This will permanently delete your portfolio and cannot be recovered.`}
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
      <DialogContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                  {isCreate && <Plus />}
                  {isUpdate && <PencilSimple />}
                  {isDuplicate && <CopySimple />}
                  <h2>
                    {isCreate && t`Create a new portfolio`}
                    {isUpdate && t`Update an existing portfolio`}
                    {isDuplicate && t`Duplicate an existing portfolio`}
                  </h2>
                </div>
              </DialogTitle>
              <DialogDescription>
                {isCreate && t`Start building your portfolio by giving it a name.`}
                {isUpdate && t`Changed your mind about the name? Give it a new one.`}
                {isDuplicate && t`Give your old portfolio a new name.`}
              </DialogDescription>
            </DialogHeader>

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t`Title`}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {isCreate && t`Create`}
                {isUpdate && t`Save Changes`}
                {isDuplicate && t`Duplicate`}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
