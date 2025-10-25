import { t } from "@lingui/macro";
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react";
import { defaultSections } from "@reactive-resume/schema";
import { RichInput } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { AnimatePresence, motion } from "framer-motion";

import { AiActions } from "@/client/components/ai-actions";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "./shared/section-icon";
import { SectionOptions } from "./shared/section-options";

export const SummarySection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const section = useResumeStore(
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (state) => state.resume.data.sections.summary ?? defaultSections.summary,
  );
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const collapsed = useResumeStore((state) => state.collapsedSections.summary ?? false);
  const toggleSectionCollapse = useResumeStore((state) => state.toggleSectionCollapsed);

  return (
    <section id="summary" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button
            className="text-gray-500 transition-colors hover:text-gray-700"
            aria-label={collapsed ? t`Expand section` : t`Collapse section`}
            onClick={() => {
              toggleSectionCollapse("summary");
            }}
          >
            {collapsed ? <CaretRightIcon size={18} /> : <CaretDownIcon size={18} />}
          </button>
          <SectionIcon id="summary" size={18} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{section.name}</h2>
        </div>

        <div className="flex items-center gap-x-2">
          <SectionOptions id="summary" />
        </div>
      </header>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="summary-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <main className={cn(!section.visible && "opacity-50")}>
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
