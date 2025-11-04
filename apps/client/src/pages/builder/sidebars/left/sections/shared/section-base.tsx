import type { DragEndEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { t } from "@lingui/macro";
import { CaretRightIcon, PlusIcon } from "@phosphor-icons/react";
import type { SectionItem, SectionKey, SectionWithItem } from "@reactive-resume/schema";
import { Button } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import type { MotionProps } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import get from "lodash.get";

import { useDialog } from "@/client/stores/dialog";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "./section-icon";
import { SectionListItem } from "./section-list-item";
import { SectionOptions } from "./section-options";

export const sectionVariants: MotionProps = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.25, ease: "easeInOut" },
};

type Props<T extends SectionItem> = {
  id: SectionKey;
  title: (item: T) => string;
  description?: (item: T) => string | undefined;
};

export const SectionBase = <T extends SectionItem>({ id, title, description }: Props<T>) => {
  const { open } = useDialog(id);

  const collapsed = useResumeStore((state) => state.collapsedSections[id] ?? false);
  const toggleCollapseSection = useResumeStore((state) => state.toggleCollapseSection);

  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore(
    (state) => get(state.resume.data.sections, id) as SectionWithItem<T>,
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!section) return null;

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = section.items.findIndex((item) => item.id === active.id);
      const newIndex = section.items.findIndex((item) => item.id === over.id);

      const sortedList = arrayMove(section.items as T[], oldIndex, newIndex);
      setValue(`sections.${id}.items`, sortedList);
    }
  };

  const onCreate = () => {
    open("create", { id });
  };

  const onUpdate = (item: T) => {
    open("update", { id, item });
  };

  const onDuplicate = (item: T) => {
    open("duplicate", { id, item });
  };

  const onDelete = (item: T) => {
    open("delete", { id, item });
  };

  const onToggleVisibility = (index: number) => {
    const visible = get(section, `items[${index}].visible`, true);
    setValue(`sections.${id}.items[${index}].visible`, !visible);
  };

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="grid gap-y-6"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button
            size="icon"
            variant="ghost"
            aria-label={collapsed ? t`Expand section` : t`Collapse section`}
            onClick={() => {
              toggleCollapseSection(id);
            }}
          >
            <CaretRightIcon
              size={18}
              className={cn("transition-transform", !collapsed && "rotate-90")}
            />
          </Button>

          {getSectionIcon(id, { size: 18 })}

          <h2 className="ml-2 line-clamp-1 text-2xl font-bold lg:text-3xl">{section.name}</h2>
        </div>

        <div className="flex items-center gap-x-2">
          <SectionOptions id={id} />
        </div>
      </header>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div key={`${id}-content`} {...sectionVariants} className="overflow-hidden">
            <main className={cn("grid transition-opacity", !section.visible && "opacity-50")}>
              {section.items.length === 0 && (
                <Button
                  className="gap-x-2 border-dashed py-6 leading-relaxed hover:bg-secondary-accent"
                  variant="outline"
                  onClick={() => {
                    onCreate();
                  }}
                >
                  <PlusIcon size={14} />
                  <span className="font-medium">
                    {t({
                      message: "Add a new item",
                      context: "For example, add a new work experience, or add a new profile.",
                    })}
                  </span>
                </Button>
              )}

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToParentElement]}
                onDragEnd={onDragEnd}
              >
                <SortableContext items={section.items} strategy={verticalListSortingStrategy}>
                  <AnimatePresence>
                    {section.items.map((item, index) => (
                      <SectionListItem
                        key={item.id}
                        id={item.id}
                        visible={item.visible}
                        title={title(item as T)}
                        description={description?.(item as T)}
                        onUpdate={() => {
                          onUpdate(item as T);
                        }}
                        onDelete={() => {
                          onDelete(item as T);
                        }}
                        onDuplicate={() => {
                          onDuplicate(item as T);
                        }}
                        onToggleVisibility={() => {
                          onToggleVisibility(index);
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </SortableContext>
              </DndContext>
            </main>

            {section.items.length > 0 && (
              <footer className="flex items-center justify-end">
                <Button
                  className="ml-auto gap-x-2 text-xs lg:text-sm"
                  variant="outline"
                  onClick={() => {
                    onCreate();
                  }}
                >
                  <PlusIcon />
                  <span>
                    {t({
                      message: "Add a new item",
                      context: "For example, add a new work experience, or add a new profile.",
                    })}
                  </span>
                </Button>
              </footer>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
