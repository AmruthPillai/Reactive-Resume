import { ScrollArea, Separator } from "@reactive-resume/ui";
import { useRef } from "react";

import { Copyright } from "@/client/components/copyright";
import { ThemeSwitch } from "@/client/components/theme-switch";

import { ExportSection } from "./sections/export";
import { InformationSection } from "./sections/information";
import { LayoutSection } from "./sections/layout";
import { PageSection } from "./sections/page";
import { SharingSection } from "./sections/sharing";
import { StatisticsSection } from "./sections/statistics";
import { TemplateSection } from "./sections/template";
import { ThemeSection } from "./sections/theme";
import { TypographySection } from "./sections/typography";
import { SectionIcon } from "./shared/section-icon";

export const RightSidebar = () => {
  const containterRef = useRef<HTMLDivElement | null>(null);

  const scrollIntoView = (selector: string) => {
    const section = containterRef.current?.querySelector(selector);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex bg-secondary-accent/30 pt-16 lg:pt-0">
      <ScrollArea orientation="vertical" className="h-screen flex-1">
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
          <InformationSection />
          <Separator />
          <Copyright className="text-center" />
        </div>
      </ScrollArea>

      <div className="hidden basis-12 flex-col items-center justify-between bg-secondary-accent/30 py-4 sm:flex">
        <div />

        <div className="flex flex-col items-center justify-center gap-y-2">
          <SectionIcon id="template" name="Template" onClick={() => scrollIntoView("#template")} />
          <SectionIcon id="layout" name="Layout" onClick={() => scrollIntoView("#layout")} />
          <SectionIcon
            id="typography"
            name="Typography"
            onClick={() => scrollIntoView("#typography")}
          />
          <SectionIcon id="theme" name="Theme" onClick={() => scrollIntoView("#theme")} />
          <SectionIcon id="page" name="Page" onClick={() => scrollIntoView("#page")} />
          <SectionIcon id="sharing" name="Sharing" onClick={() => scrollIntoView("#sharing")} />
        </div>

        <ThemeSwitch size={14} />
      </div>
    </div>
  );
};
