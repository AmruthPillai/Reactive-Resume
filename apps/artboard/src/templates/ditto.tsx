import { Fragment } from "react";

import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";
import { cn, isUrl, isEmptyString, sanitize } from "@reactive-resume/utils";

// Use shared components but override summary for Ditto-specific styling
const mapSectionToComponentDitto = (section: string) => {
  if (section === "summary") {
    return <DittoSummary />;
  }
  return mapSectionToComponent(section as any);
};

// Custom header for Ditto template with unique grid layout
const DittoHeader = () => {
  const basics = useArtboardStore((state) => state.resume.basics);

  return (
    <div className="relative grid grid-cols-3 space-x-4 p-custom pb-0">
      <div className="mx-auto">
        {/* Picture would go here */}
      </div>

      <div className="relative z-10 col-span-2 text-background">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-bold">{basics.name}</h2>
          <p>{basics.headline}</p>
        </div>

        <div className="col-span-2 col-start-2 mt-10 text-foreground">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
            {basics.location && (
              <>
                <div className="flex items-center gap-x-1.5">
                  <i className="ph ph-bold ph-map-pin text-primary" />
                  <div>{basics.location}</div>
                </div>
                <div className="bg-text size-1 rounded-full last:hidden" />
              </>
            )}

            {basics.phone && (
              <>
                <div className="flex items-center gap-x-1.5">
                  <i className="ph ph-bold ph-phone text-primary" />
                  <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                    {basics.phone}
                  </a>
                </div>
                <div className="bg-text size-1 rounded-full last:hidden" />
              </>
            )}
            {basics.email && (
              <>
                <div className="flex items-center gap-x-1.5">
                  <i className="ph ph-bold ph-at text-primary" />
                  <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
                    {basics.email}
                  </a>
                </div>
                <div className="bg-text size-1 rounded-full last:hidden" />
              </>
            )}
            {isUrl(basics.url.href) && (
              <>
                <div className="flex items-center gap-x-1.5">
                  <i className="ph ph-bold ph-link text-primary" />
                  <a
                    href={basics.url.href}
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                    className="line-clamp-1 max-w-fit"
                  >
                    {basics.url.label || basics.url.href}
                  </a>
                </div>
                <div className="bg-text size-1 rounded-full last:hidden" />
              </>
            )}
            {basics.customFields.map((item) => (
              <Fragment key={item.id}>
                <div className="flex items-center gap-x-1.5">
                  <i className={cn(`ph ph-bold ph-${item.icon}`, "text-primary")} />
                  {isUrl(item.value) ? (
                    <a href={item.value} target="_blank" rel="noreferrer noopener nofollow">
                      {item.name || item.value}
                    </a>
                  ) : (
                    <span>{[item.name, item.value].filter(Boolean).join(": ")}</span>
                  )}
                </div>
                <div className="bg-text size-1 rounded-full last:hidden" />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom summary for Ditto template
const DittoSummary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || isEmptyString(section.content)) return null;

  return (
    <section id={section.id}>
      <h4 className="mb-2 text-base font-bold">{section.name}</h4>

      <div
        dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
        style={{ columns: section.columns }}
        className="wysiwyg"
      />
    </section>
  );
};

export const Ditto = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div>
      {isFirstPage && (
        <div className="relative">
          <DittoHeader />
          <div className="absolute inset-x-0 top-0 h-[85px] w-full bg-primary" />
        </div>
      )}

      <div className="grid grid-cols-3">
        <div className="sidebar group space-y-4 p-custom">
          {sidebar.map((section) => (
            <Fragment key={section}>{mapSectionToComponentDitto(section)}</Fragment>
          ))}
        </div>

        <div
          className={cn(
            "main group space-y-4 p-custom",
            sidebar.length > 0 ? "col-span-2" : "col-span-3",
          )}
        >
          {main.map((section) => (
            <Fragment key={section}>{mapSectionToComponentDitto(section)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
