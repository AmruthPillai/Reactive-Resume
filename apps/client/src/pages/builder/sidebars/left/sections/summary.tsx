/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable react-hooks/rules-of-hooks */
import { defaultSections } from "@reactive-resume/schema";
import { RichInput } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { useSearchParams } from "react-router-dom";

import { AiActions } from "@/client/components/ai-actions";
import { usePortfolioStore } from "@/client/stores/portfolio";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "./shared/section-icon";
import { SectionOptions } from "./shared/section-options";

export const SummarySection = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "resume";

  // Use appropriate store based on mode
  const setValue =
    mode === "portfolio"
      ? usePortfolioStore((state) => state.setValue)
      : useResumeStore((state) => state.setValue);

  const section =
    mode === "portfolio"
      ? usePortfolioStore(
          (state) => state.portfolio?.data?.sections?.summary ?? defaultSections.summary,
        )
      : useResumeStore((state) => state.resume?.data?.sections?.summary ?? defaultSections.summary);

  // If section isn't loaded yet, return null or loading state
  if (!section) {
    return null;
  }

  return (
    <section id="summary" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("summary")}
          <h2 className="line-clamp-1 text-3xl font-bold">{section.name}</h2>
        </div>

        <div className="flex items-center gap-x-2">
          <SectionOptions id="summary" />
        </div>
      </header>

      <main className={cn(!section.visible && "opacity-50")}>
        <RichInput
          content={section.content}
          footer={(editor) => (
            <AiActions value={editor.getText()} onChange={editor.commands.setContent} />
          )}
          onChange={(value) => {
            setValue("sections.summary.content", value);
          }}
        />
      </main>
    </section>
  );
};
