/* eslint-disable react-hooks/rules-of-hooks */
import { SectionKey } from "@reactive-resume/schema";
import { PortfolioTemplate, Template } from "@reactive-resume/utils";
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

  // Get data with null checks
  const resumeData = useArtboardStore((state) => state.resume);
  const portfolioData = useArtboardStore((state) => state.portfolio);

  // Get layout and template based on mode
  const layout =
    mode === "portfolio" ? portfolioData.metadata.layout.sections : resumeData.metadata.layout;
  console.log("layout", layout);
  const template =
    mode === "portfolio"
      ? (portfolioData.metadata.template as PortfolioTemplate)
      : (resumeData.metadata.template as Template);

  const TemplateComponent = useMemo(() => {
    if (mode === "portfolio") {
      return getPortfolioTemplate(template as PortfolioTemplate);
    }
    return getTemplate(template as Template);
  }, [template, mode]);

  // Portfolio Preview
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
      {layout.map((columns, pageIndex: number) => (
        <Page key={pageIndex} mode="preview" pageNumber={pageIndex + 1}>
          <ResumeTemplate isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
        </Page>
      ))}
    </>
  );
};
