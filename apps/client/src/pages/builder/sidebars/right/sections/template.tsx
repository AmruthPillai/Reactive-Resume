import { Button, HoverCard, HoverCardContent, HoverCardTrigger } from "@reactive-resume/ui";
import { cn, templatesList } from "@reactive-resume/utils";

import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "../shared/section-icon";

export const TemplateSection = () => {
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

      <main className="grid grid-cols-2 gap-4">
        {templatesList.map(({ id, name, image }) => (
          <HoverCard key={id} openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setValue("metadata.template", id)}
                className={cn(
                  "flex h-12 items-center justify-center overflow-hidden rounded border text-center text-sm capitalize ring-primary transition-colors hover:bg-secondary-accent focus:outline-none focus:ring-1 disabled:opacity-100",
                  id === currentTemplate && "ring-1",
                )}
              >
                {name}
              </Button>
            </HoverCardTrigger>

            <HoverCardContent className="max-w-xs overflow-hidden border-none bg-white p-0">
              <img alt={name} src={image} loading="lazy" className="aspect-[1/1.4142]" />
            </HoverCardContent>
          </HoverCard>
        ))}
      </main>
    </section>
  );
};
