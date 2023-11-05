import { ResumeData, SectionKey } from "@reactive-resume/schema";
import { Artboard, PageWrapper, Rhyhorn } from "@reactive-resume/templates";
import { Navigate } from "react-router-dom";
import { useSessionStorage } from "usehooks-ts";

export const PrinterPage = () => {
  const [resume] = useSessionStorage<ResumeData | null>("resume", null);

  if (!resume) return <Navigate to="/" replace />;

  return (
    <Artboard resume={resume} style={{ pointerEvents: "auto" }}>
      {resume.metadata.layout.map((columns, pageIndex) => (
        <PageWrapper key={pageIndex} data-page={pageIndex + 1}>
          <Rhyhorn isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
        </PageWrapper>
      ))}
    </Artboard>
  );
};
