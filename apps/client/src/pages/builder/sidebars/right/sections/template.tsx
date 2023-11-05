import { Button } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";

import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "../shared/section-icon";

export const TemplateSection = () => {
  // TODO: Import templates from @reactive-resume/templates
  const templateList = ["rhyhorn"];

  const setValue = useResumeStore((state) => state.setValue);
  const currentTemplate = useResumeStore((state) => state.resume.data.metadata.template);

  return (
    <section id="template" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("template")}
          <h2 className="line-clamp-1 text-3xl font-bold">Template</h2>
        </div>
      </header>

      <main className="grid grid-cols-2 gap-y-4">
        {templateList.map((template) => (
          <Button
            key={template}
            variant="outline"
            disabled={template === currentTemplate}
            onClick={() => setValue("metadata.template", template)}
            className={cn(
              "flex h-12 items-center justify-center overflow-hidden rounded border text-center text-sm capitalize ring-primary transition-colors hover:bg-secondary-accent focus:outline-none focus:ring-1 disabled:opacity-100",
              template === currentTemplate && "ring-1",
            )}
          >
            {template}
          </Button>
        ))}
      </main>
    </section>
  );
};
