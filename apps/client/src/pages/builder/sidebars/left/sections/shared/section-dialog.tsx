import { t } from "@lingui/macro";
import { createId } from "@paralleldrive/cuid2";
import { CopySimple, PencilSimple, Plus } from "@phosphor-icons/react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SectionFormat } from "@reactive-resume/dto";
import type { SectionItem, SectionWithItem } from "@reactive-resume/schema";
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
  ScrollArea,
} from "@reactive-resume/ui";
import { produce } from "immer";
import get from "lodash.get";
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";

import { deleteSectionItem, updateSectionItem } from "@/client/services/section";
import { createSectionItem } from "@/client/services/section/create";
import type { DialogName } from "@/client/stores/dialog";
import { useDialog } from "@/client/stores/dialog";
import { useResumeStore } from "@/client/stores/resume";

type Props<T extends SectionItem> = {
  id: DialogName;
  form: UseFormReturn<T>;
  defaultValues: T;
  pendingKeyword?: string;
  children: React.ReactNode;
};

export const SectionDialog = <T extends SectionItem>({
  id,
  form,
  defaultValues,
  pendingKeyword,
  children,
}: Props<T>) => {
  const { isOpen, mode, close, payload } = useDialog<T>(id);

  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore((state) => {
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

    const sectionFormat: SectionFormat = SectionFormat[section.name as keyof typeof SectionFormat];

    if (isCreate || isDuplicate) {
      const dto = await createSectionItem({
        format: sectionFormat,
        data: values,
      });

      values.id = dto.id;

      if (pendingKeyword && "keywords" in values) {
        values.keywords.push(pendingKeyword);
      }

      setValue(
        `sections.${id}.items`,
        produce(section.items, (draft: T[]): void => {
          draft.push({ ...values, id: dto.id });
        }),
      );
    }

    if (isUpdate) {
      if (!payload.item?.id) return;

      await updateSectionItem({
        id: values.id,
        data: values,
      });

      if (pendingKeyword && "keywords" in values) {
        values.keywords.push(pendingKeyword);
      }

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

      await deleteSectionItem({
        id: values.id,
      });

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
          <ScrollArea>
            <form
              className="max-h-[60vh] space-y-6 lg:max-h-fit"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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

                <VisuallyHidden>
                  <DialogDescription />
                </VisuallyHidden>
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
          </ScrollArea>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
