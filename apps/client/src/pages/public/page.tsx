import { ResumeDto } from "@reactive-resume/dto";
import { SectionKey } from "@reactive-resume/schema";
import { Artboard, PageWrapper, Rhyhorn } from "@reactive-resume/templates";
import { Button } from "@reactive-resume/ui";
import { pageSizeMap } from "@reactive-resume/utils";
import { Helmet } from "react-helmet-async";
import { Link, LoaderFunction, redirect, useLoaderData } from "react-router-dom";

import { Icon } from "@/client/components/icon";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { toast } from "@/client/hooks/use-toast";
import { queryClient } from "@/client/libs/query-client";
import { findResumeByUsernameSlug } from "@/client/services/resume";

export const PublicResumePage = () => {
  const { title, data: resume } = useLoaderData() as ResumeDto;
  const format = resume.metadata.page.format;

  return (
    <div>
      <Helmet>
        <title>{title} - Reactive Resume</title>
      </Helmet>

      <div
        style={{ width: `${pageSizeMap[format].width}mm` }}
        className="mx-auto mb-6 mt-16 flex shadow-xl print:m-0 print:shadow-none"
      >
        <Artboard resume={resume} style={{ pointerEvents: "auto" }}>
          {resume.metadata.layout.map((columns, pageIndex) => (
            <PageWrapper key={pageIndex} data-page={pageIndex + 1}>
              <Rhyhorn isFirstPage={pageIndex === 0} columns={columns as SectionKey[][]} />
            </PageWrapper>
          ))}
        </Artboard>
      </div>

      <div className="flex justify-center py-10 opacity-50 print:hidden">
        <Link to="/">
          <Button size="sm" variant="ghost" className="space-x-1.5 text-xs font-normal">
            <span>Built with</span>
            <Icon size={12} />
            <span>Reactive Resume</span>
          </Button>
        </Link>
      </div>

      <div className="fixed bottom-5 right-5 print:hidden">
        <ThemeSwitch />
      </div>
    </div>
  );
};

export const publicLoader: LoaderFunction<ResumeDto> = async ({ params }) => {
  try {
    const username = params.username as string;
    const slug = params.slug as string;

    const resume = await queryClient.fetchQuery({
      queryKey: ["resume", { username, slug }],
      queryFn: () => findResumeByUsernameSlug({ username, slug }),
    });

    return resume;
  } catch (error) {
    toast({
      variant: "error",
      title: "The resume you were looking for was nowhere to be found... or maybe never existed?",
    });

    return redirect("/");
  }
};
