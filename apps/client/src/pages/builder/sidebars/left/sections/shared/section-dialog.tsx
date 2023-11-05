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
import { useEffect, useMemo } from "react";
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
  const name = useMemo(() => section?.name ?? "", [section?.name]);

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
        <AlertDialogContent>
          <Form {...form}>
            <form>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this {name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action can be reverted by clicking on the undo button in the floating
                  toolbar.
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
                  {isCreate && <Plus />}
                  {isUpdate && <PencilSimple />}
                  {isDuplicate && <CopySimple />}
                  <h2>
                    {isCreate && `Create a new ${name}`}
                    {isUpdate && `Update an existing ${name}`}
                    {isDuplicate && `Duplicate an existing ${name}`}
                  </h2>
                </div>
              </DialogTitle>
            </DialogHeader>

            {children}

            <DialogFooter>
              <Button type="submit">
                {isCreate && "Create"}
                {isUpdate && "Save Changes"}
                {isDuplicate && "Duplicate"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
