import { t } from "@lingui/macro";
import { CaretRightIcon } from "@phosphor-icons/react";
import { defaultSections } from "@reactive-resume/schema";
import { Button, RichInput } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { AiActions } from "@/client/components/ai-actions";
import { useResumeStore } from "@/client/stores/resume";

import { sectionVariants } from "./shared/section-base";
import { getSectionIcon } from "./shared/section-icon";
import { SectionOptions } from "./shared/section-options";

export const SummarySection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (state) => state.resume.data.sections.summary ?? defaultSections.summary,
  );

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const collapsed = useResumeStore((state) => state.collapsedSections.summary ?? false);
  const toggleCollapseSection = useResumeStore((state) => state.toggleCollapseSection);

  return (
    <section id="summary" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button
            size="icon"
            variant="ghost"
            aria-label={collapsed ? t`Expand section` : t`Collapse section`}
            onClick={() => {
              toggleCollapseSection("summary");
            }}
          >
            <CaretRightIcon
              size={18}
              className={cn("transition-transform", !collapsed && "rotate-90")}
            />
          </Button>

          {getSectionIcon("summary", { size: 18 })}

          <h2 className="ml-2 line-clamp-1 text-2xl font-bold lg:text-3xl">{section.name}</h2>
        </div>

        <div className="flex items-center gap-x-2">
          <SectionOptions id="summary" />
        </div>
      </header>

      <AnimatePresence>
        {!collapsed && (
          <motion.div key="summary-content" {...sectionVariants} className="overflow-hidden">
            <main className={cn("grid transition-opacity", !section.visible && "opacity-50")}>
              <RichInput
                content={section.content}
                footer={(editor) => (
                  <AiActions
                    value={editor.getText()}
                    onChange={(value) => {
                      editor.commands.setContent(value, true);
                      setValue("sections.summary.content", value);
                    }}
                  />
                )}
                onChange={(value) => {
                  setValue("sections.summary.content", value);
                }}
              />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
