import { t } from "@lingui/macro";
import { ScrollArea, Separator } from "@reactive-resume/ui";
import { ResumeOptions } from "@reactive-resume/utils";
import { useRef } from "react";

import { Copyright } from "@/client/components/copyright";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { ExportSection } from "@/client/pages/builder/_components/sections/export";
import { InformationSection } from "@/client/pages/builder/_components/sections/information";
import { LayoutSection } from "@/client/pages/builder/_components/sections/layout";
import { NotesSection } from "@/client/pages/builder/_components/sections/notes";
import { PageSection } from "@/client/pages/builder/_components/sections/page";
import { SharingSection } from "@/client/pages/builder/_components/sections/sharing";
import { StatisticsSection } from "@/client/pages/builder/_components/sections/statistics";
import { TemplateSection } from "@/client/pages/builder/_components/sections/template";
import { ThemeSection } from "@/client/pages/builder/_components/sections/theme";
import { TypographySection } from "@/client/pages/builder/_components/sections/typography";
import { SectionIcon } from "@/client/pages/builder/_components/shared/section-icon";

export const RightSidebar = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex bg-secondary-accent/30">
      <ScrollArea orientation="vertical" className="h-screen flex-1 pb-16 lg:pb-0">
        <div ref={containterRef} className="grid gap-y-6 p-6 @container/right">
          <TemplateSection />
          <Separator />
          <LayoutSection />
          <Separator />
          <TypographySection />
          <Separator />
          <ThemeSection />
          <Separator />
          <PageSection />
          <Separator />
          <SharingSection />
          <Separator />
          <StatisticsSection />
          <Separator />
          <ExportSection />
          <Separator />
          <NotesSection />
          <Separator />
          <InformationSection />
          <Separator />
          <Copyright className="text-center" />
        </div>
      </ScrollArea>

      <div className="hidden basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          <SectionIcon
            id={ResumeOptions.TEMPLATE}
            name={t`Template`}
            onClick={() => scrollIntoView(`#${ResumeOptions.NOTES}`)}
          />
          <SectionIcon
            id={ResumeOptions.LAYOUT}
            name={t`Layout`}
            onClick={() => scrollIntoView(`#${ResumeOptions.LAYOUT}`)}
          />
          <SectionIcon
            id={ResumeOptions.TYPOGRAPHY}
            name={t`Typography`}
            onClick={() => scrollIntoView(`#${ResumeOptions.TYPOGRAPHY}`)}
          />
          <SectionIcon
            id={ResumeOptions.THEME}
            name={t`Theme`}
            onClick={() => scrollIntoView(`#${ResumeOptions.THEME}`)}
          />
          <SectionIcon
            id={ResumeOptions.PAGE}
            name={t`Page`}
            onClick={() => scrollIntoView(`#${ResumeOptions.PAGE}`)}
          />
          <SectionIcon
            id={ResumeOptions.SHARING}
            name={t`Sharing`}
            onClick={() => scrollIntoView(`#${ResumeOptions.SHARING}`)}
          />
          <SectionIcon
            id={ResumeOptions.STATISTICS}
            name={t`Statistics`}
            onClick={() => scrollIntoView(`#${ResumeOptions.STATISTICS}`)}
          />
          <SectionIcon
            id={ResumeOptions.EXPORT}
            name={t`Export`}
            onClick={() => scrollIntoView(`#${ResumeOptions.EXPORT}`)}
          />
          <SectionIcon
            id={ResumeOptions.NOTES}
            name={t`Notes`}
            onClick={() => scrollIntoView(`#${ResumeOptions.NOTES}`)}
          />
          <SectionIcon
            id={ResumeOptions.INFORMATION}
            name={t`Information`}
            onClick={() => scrollIntoView(`#${ResumeOptions.INFORMATION}`)}
          />
        </div>

        <ThemeSwitch size={14} />
      </div>
    </div>
  );
};
