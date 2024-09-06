import { SectionKey } from "@reactive-resume/schema";
import { Template } from "@reactive-resume/utils";
import { useMemo } from "react";

import { Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { getTemplate } from "../templates";

export const PreviewLayout = () => {
  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const template = useArtboardStore((state) => state.resume.metadata.template as Template);
  const rtl = useArtboardStore((state) => state.resume.metadata.page.rtl);

  const Template = useMemo(() => getTemplate(template), [template]);

  return (
    <>
      {layout.map((columns, pageIndex) => (
        <Page key={pageIndex} mode="preview" pageNumber={pageIndex + 1}>
          <Template isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} rtl={rtl} />
        </Page>
      ))}
    </>
  );
};
