import { SectionKey } from "@reactive-resume/schema";

import { Page } from "../components/page";
import { useArtboardStore } from "../store/artboard";
import { Rhyhorn } from "../templates/rhyhorn";

export const PreviewLayout = () => {
  const layout = useArtboardStore((state) => state.resume.metadata.layout);
  const template = useArtboardStore((state) => state.resume.metadata.template);

  return (
    <>
      {layout.map((columns, pageIndex) => (
        <Page key={pageIndex} mode="preview" pageNumber={pageIndex + 1}>
          {template === "rhyhorn" && (
            <Rhyhorn isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
          )}
        </Page>
      ))}
    </>
  );
};
