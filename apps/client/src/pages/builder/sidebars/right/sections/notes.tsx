import { t } from "@lingui/macro";
import { RichInput } from "@reactive-resume/ui";

import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

export const NotesSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const notes = useResumeStore((state) => state.resume.data.metadata.notes);

  return (
    <section id="notes" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="notes" size={18} name={t`Notes`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Notes`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <p className="leading-relaxed">
          {t`This section is reserved for your personal notes specific to this resume. The content here remains private and is not shared with anyone else.`}
        </p>

        <div className="space-y-1.5">
          <RichInput
            content={notes}
            onChange={(content) => {
              setValue("metadata.notes", content);
            }}
          />

          <p className="text-xs leading-relaxed opacity-75">
            {t`For example, information regarding which companies you sent this resume to or the links to the job descriptions can be noted down here.`}
          </p>
        </div>
      </main>
    </section>
  );
};
