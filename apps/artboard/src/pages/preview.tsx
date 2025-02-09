import { SectionKey } from "@reactive-resume/schema";
import { Template } from "@reactive-resume/utils";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { getTemplate } from "../templates";
import { getPortfolioTemplate } from "../templates/portfolio/registry";
import { PortfolioTemplateProps } from "../templates/portfolio/types";
import { TemplateProps } from "../types/template";

export const PreviewLayout = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") ?? "resume";

  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const portfolioData = useArtboardStore((state) => state.portfolio);
  const resumeData = useArtboardStore((state) => state.resume);

  const template =
    mode === "portfolio"
      ? portfolioData.metadata.template
      : (resumeData.metadata.template as Template);

  const TemplateComponent = useMemo(() => {
    if (mode === "portfolio") {
      return getPortfolioTemplate(template);
    }
    return getTemplate(template as Template);
  }, [template, mode]);

  // if (!TemplateComponent) return null;

  if (mode === "portfolio") {
    const PortfolioTemplate = TemplateComponent as React.ComponentType<PortfolioTemplateProps>;
    return (
      <Page mode="preview" pageNumber={1}>
        <PortfolioTemplate data={portfolioData} />
      </Page>
    );
  }

  const ResumeTemplate = TemplateComponent as React.ComponentType<TemplateProps>;
  return (
    <>
      {layout.map((columns, pageIndex) => (
        <Page key={pageIndex} mode="preview" pageNumber={pageIndex + 1}>
          <ResumeTemplate isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
        </Page>
      ))}
    </>
  );
};
