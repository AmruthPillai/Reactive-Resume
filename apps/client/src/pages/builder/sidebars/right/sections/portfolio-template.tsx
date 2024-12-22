// client/src/pages/builder/sidebars/right/sections/portfolio-template.tsx
import { t } from "@lingui/macro";
import { motion } from "framer-motion";
import { AspectRatio } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { portfolioTemplatesList } from "@reactive-resume/schema";
import { useResumeStore } from "@/client/stores/resume";
import { getSectionIcon } from "../shared/section-icon";

export const PortfolioTemplateSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const currentTemplate = useResumeStore((state) => state.portfolio.data.metadata.template);

  return (
    <section id="portfolio-template" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("template")}
          <h2 className="line-clamp-1 text-3xl font-bold">{t`Portfolio Template`}</h2>
        </div>
      </header>

      <main className="grid grid-cols-2 gap-5 @lg/right:grid-cols-3 @2xl/right:grid-cols-4">
        {portfolioTemplatesList.map((template, index) => (
          <AspectRatio key={template.id} ratio={16 / 9}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: index * 0.1 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              className={cn(
                "relative cursor-pointer rounded-sm ring-primary transition-all hover:ring-2",
                currentTemplate === template.id && "ring-2",
              )}
              onClick={() => {
                setValue("metadata.template", template.id);
              }}
            >
              <img 
                src={`/templates/portfolio/${template.id}.jpg`} 
                alt={template.name} 
                className="rounded-sm" 
              />

              <div className="absolute inset-x-0 bottom-0 h-32 w-full bg-gradient-to-b from-transparent to-background/80">
                <p className="absolute inset-x-0 bottom-2 text-center font-bold text-primary">
                  {template.name}
                </p>
              </div>
            </motion.div>
          </AspectRatio>
        ))}
      </main>
    </section>
  );
};
