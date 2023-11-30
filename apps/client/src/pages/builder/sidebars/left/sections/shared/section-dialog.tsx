import { t } from "@lingui/macro";
import { createId } from "@paralleldrive/cuid2";
import { CopySimple, PencilSimple, Plus } from "@phosphor-icons/react";
import { SectionItem, SectionWithItem } from "@reactive-resume/schema";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
} from "@reactive-resume/ui";
import { produce } from "immer";
import get from "lodash.get";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

import { DialogName, useDialog } from "@/client/stores/dialog";
import { useResumeStore } from "@/client/stores/resume";

type Props<T extends SectionItem> = {
  id: DialogName;
  form: UseFormReturn<T>;
  defaultValues: T;
  children: React.ReactNode;
};

export const SectionDialog = <T extends SectionItem>({
  id,
  form,
  defaultValues,
  children,
}: Props<T>) => {
  const { isOpen, mode, close, payload } = useDialog<T>(id);

  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore((state) => {
    if (!id) return null;
    return get(state.resume.data.sections, id);
  }) as SectionWithItem<T> | null;

  const isCreate = mode === "create";
  const isUpdate = mode === "update";
  const isDelete = mode === "delete";
  const isDuplicate = mode === "duplicate";

  useEffect(() => {
    if (isOpen) onReset();
  }, [isOpen, payload]);

  const onSubmit = async (values: T) => {
    if (!section) return;

    if (isCreate || isDuplicate) {
      setValue(
        `sections.${id}.items`,
        produce(section.items, (draft: T[]): void => {
          draft.push({ ...values, id: createId() });
        }),
      );
    }

    if (isUpdate) {
      if (!payload.item?.id) return;

      setValue(
        `sections.${id}.items`,
        produce(section.items, (draft: T[]): void => {
          const index = draft.findIndex((item) => item.id === payload.item?.id);
          if (index === -1) return;
          draft[index] = values;
        }),
      );
    }

    if (isDelete) {
      if (!payload.item?.id) return;

      setValue(
        `sections.${id}.items`,
        produce(section.items, (draft: T[]): void => {
          const index = draft.findIndex((item) => item.id === payload.item?.id);
          if (index === -1) return;
          draft.splice(index, 1);
        }),
      );
    }

    close();
  };

  const onReset = () => {
    if (isCreate) form.reset({ ...defaultValues, id: createId() } as T);
    if (isUpdate) form.reset({ ...defaultValues, ...payload.item });
    if (isDuplicate) form.reset({ ...payload.item, id: createId() } as T);
    if (isDelete) form.reset({ ...defaultValues, ...payload.item });
  };

  if (isDelete) {
    return (
      <AlertDialog open={isOpen} onOpenChange={close}>
        <AlertDialogContent className="z-50">
          <Form {...form}>
            <form>
              <AlertDialogHeader>
                <AlertDialogTitle>{t`Are you sure you want to delete this item?`}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t`This action can be reverted by clicking on the undo button in the floating toolbar.`}
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
      <DialogContent className="z-50">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center space-x-2.5">
                  {isCreate && <Plus />}
                  {isUpdate && <PencilSimple />}
                  {isDuplicate && <CopySimple />}
                  <h2>
                    {isCreate && t`Create a new item`}
                    {isUpdate && t`Update an existing item`}
                    {isDuplicate && t`Duplicate an existing item`}
                  </h2>
                </div>
              </DialogTitle>
            </DialogHeader>

            {children}

            <DialogFooter>
              <Button type="submit">
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
