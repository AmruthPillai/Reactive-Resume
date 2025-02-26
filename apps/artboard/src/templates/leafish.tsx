import type {
  Award,
  Certification,
  CustomSection,
  CustomSectionGroup,
  Interest,
  Language,
  Project,
  Publication,
  Reference,
  SectionKey,
  SectionWithItem,
  Skill,
  URL,
} from "@reactive-resume/schema";
import { Education, Experience, Volunteer } from "@reactive-resume/schema";
import { cn, hexToRgb, isEmptyString, isUrl, sanitize } from "@reactive-resume/utils";
import get from "lodash.get";
import React, { Fragment } from "react";

import { BrandIcon } from "../components/brand-icon";
import { Picture } from "../components/picture";
import { useArtboardStore } from "../store/artboard";
import type { TemplateProps } from "../types/template";

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);
  const section = useArtboardStore((state) => state.resume.sections.summary);
  const profiles = useArtboardStore((state) => state.resume.sections.profiles);
  const primaryColor = useArtboardStore((state) => state.resume.metadata.theme.primary);

  return (
    <div>
      <div
        className="p-custom flex items-center space-x-8"
        style={{ backgroundColor: hexToRgb(primaryColor, 0.2) }}
      >
        <div className="space-y-3">
          <div>
            <div className="text-3xl font-bold">{basics.name}</div>
            <div className="text-base font-medium text-primary">{basics.headline}</div>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: sanitize(section.content) }}
            style={{ columns: section.columns }}
            className="wysiwyg"
          />
        </div>

        <Picture />
      </div>

      <div className="p-custom space-y-3" style={{ backgroundColor: hexToRgb(primaryColor, 0.4) }}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm">
          {basics.location && (
            <div className="flex items-center gap-x-1.5">
              <i className="ph ph-bold ph-map-pin text-primary" />
              <div>{basics.location}</div>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center gap-x-1.5">
              <i className="ph ph-bold ph-phone text-primary" />
              <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                {basics.phone}
              </a>
            </div>
          )}
          {basics.email && (
            <div className="flex items-center gap-x-1.5">
              <i className="ph ph-bold ph-at text-primary" />
              <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
                {basics.email}
              </a>
            </div>
          )}
          <Link url={basics.url} />
          {basics.customFields.map((item) => (
            <div key={item.id} className="flex items-center gap-x-1.5">
              <i className={cn(`ph ph-bold ph-${item.icon}`, "text-primary")} />
              {isUrl(item.value) ? (
                <a href={item.value} target="_blank" rel="noreferrer noopener nofollow">
                  {item.name || item.value}
                </a>
              ) : (
                <span>{[item.name, item.value].filter(Boolean).join(": ")}</span>
              )}
            </div>
          ))}
        </div>

        {profiles.items.length > 0 && (
          <div className="flex items-center gap-x-3 gap-y-0.5">
            {profiles.items.map((item) => (
              <div key={item.id} className="flex items-center gap-x-2">
                <Link
                  url={item.url}
                  label={item.username}
                  className="text-sm"
                  icon={<BrandIcon slug={item.icon} />}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => (
  <div className="flex items-center gap-x-1.5">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className={cn("h-3 w-6 border-2 border-primary", level > index && "bg-primary")}
      />
    ))}
  </div>
);

type LinkProps = {
  url: URL;
  icon?: React.ReactNode;
  iconOnRight?: boolean;
  label?: string;
  className?: string;
};

const Link = ({ url, icon, iconOnRight, label, className }: LinkProps) => {
  if (!isUrl(url.href)) return null;

  return (
    <div className="flex items-center gap-x-1.5">
      {!iconOnRight && (icon ?? <i className="ph ph-bold ph-link text-primary" />)}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={cn("inline-block", className)}
      >
        {label ?? (url.label || url.href)}
      </a>
      {iconOnRight && (icon ?? <i className="ph ph-bold ph-link text-primary" />)}
    </div>
  );
};

type LinkedEntityProps = {
  name: string;
  url: URL;
  separateLinks: boolean;
  className?: string;
};

const LinkedEntity = ({ name, url, separateLinks, className }: LinkedEntityProps) => {
  return !separateLinks && isUrl(url.href) ? (
    <Link
      url={url}
      label={name}
      icon={<i className="ph ph-bold ph-globe text-primary" />}
      iconOnRight={true}
      className={className}
    />
  ) : (
    <div className={className}>{name}</div>
  );
};

type SectionProps<T> = {
  section: SectionWithItem<T> | CustomSectionGroup;
  children?: (item: T) => React.ReactNode;
  className?: string;
  urlKey?: keyof T;
  levelKey?: keyof T;
  summaryKey?: keyof T;
  keywordsKey?: keyof T;
};

const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (section.items.length === 0) return null;

  return (
    <section id={section.id} className="grid">
      <h4 className="mb-2 border-b border-primary text-left font-bold text-primary">
        {section.name}
      </h4>

      <div
        className="grid gap-x-6 gap-y-3"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => {
          const url = (urlKey && get(item, urlKey)) as URL | undefined;
          const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
          const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
          const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

          return (
            <div key={item.id} className={cn("space-y-2", className)}>
              <div>{children?.(item as T)}</div>

              {summary !== undefined && !isEmptyString(summary) && (
                <div dangerouslySetInnerHTML={{ __html: sanitize(summary) }} className="wysiwyg" />
              )}

              {level !== undefined && level > 0 && <Rating level={level} />}

              {keywords !== undefined && keywords.length > 0 && (
                <p className="text-sm">{keywords.join(", ")}</p>
              )}

              {url !== undefined && section.separateLinks && <Link url={url} />}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);

  return (
    <Section<Experience> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <LinkedEntity
            name={item.company}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.position}</div>
          <div>{item.location}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);

  return (
    <Section<Education> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <LinkedEntity
            name={item.institution}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.area}</div>
          <div>{item.score}</div>
          <div>{item.studyType}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  return (
    <Section<Award> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-bold">{item.title}</div>
          <LinkedEntity name={item.awarder} url={item.url} separateLinks={section.separateLinks} />
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Certifications = () => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);

  return (
    <Section<Certification> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <LinkedEntity name={item.issuer} url={item.url} separateLinks={section.separateLinks} />
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Skills = () => {
  const section = useArtboardStore((state) => state.resume.sections.skills);

  return (
    <Section<Skill> section={section} levelKey="level" keywordsKey="keywords">
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  return (
    <Section<Interest> section={section} keywordsKey="keywords" className="space-y-0.5">
      {(item) => <div className="font-bold">{item.name}</div>}
    </Section>
  );
};

const Publications = () => {
  const section = useArtboardStore((state) => state.resume.sections.publications);

  return (
    <Section<Publication> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <LinkedEntity
            name={item.name}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.publisher}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Volunteer = () => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);

  return (
    <Section<Volunteer> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <LinkedEntity
            name={item.organization}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.position}</div>
          <div>{item.location}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  return (
    <Section<Language> section={section} levelKey="level">
      {(item) => (
        <div>
          <div className="font-bold">{item.name}</div>
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  return (
    <Section<Project> section={section} urlKey="url" summaryKey="summary" keywordsKey="keywords">
      {(item) => (
        <div>
          <div>
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.description}</div>
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const References = () => {
  const section = useArtboardStore((state) => state.resume.sections.references);

  return (
    <Section<Reference> section={section} urlKey="url" summaryKey="summary">
      {(item) => (
        <div>
          <LinkedEntity
            name={item.name}
            url={item.url}
            separateLinks={section.separateLinks}
            className="font-bold"
          />
          <div>{item.description}</div>
        </div>
      )}
    </Section>
  );
};

const Custom = ({ id }: { id: string }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);

  return (
    <Section<CustomSection>
      section={section}
      urlKey="url"
      summaryKey="summary"
      keywordsKey="keywords"
    >
      {(item) => (
        <div>
          <div>
            <LinkedEntity
              name={item.name}
              url={item.url}
              separateLinks={section.separateLinks}
              className="font-bold"
            />
            <div>{item.description}</div>
            <div>{item.location}</div>
            <div className="font-bold">{item.date}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

const mapSectionToComponent = (section: SectionKey) => {
  switch (section) {
    case "experience": {
      return <Experience />;
    }
    case "education": {
      return <Education />;
    }
    case "awards": {
      return <Awards />;
    }
    case "certifications": {
      return <Certifications />;
    }
    case "skills": {
      return <Skills />;
    }
    case "interests": {
      return <Interests />;
    }
    case "publications": {
      return <Publications />;
    }
    case "volunteer": {
      return <Volunteer />;
    }
    case "languages": {
      return <Languages />;
    }
    case "projects": {
      return <Projects />;
    }
    case "references": {
      return <References />;
    }
    default: {
      if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} />;

      return null;
    }
  }
};

export const Leafish = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div>
      {isFirstPage && <Header />}

      <div className="p-custom grid grid-cols-2 items-start space-x-6">
        <div className={cn("grid gap-y-4", sidebar.length === 0 && "col-span-2")}>
          {main.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>

        <div className={cn("grid gap-y-4", sidebar.length === 0 && "hidden")}>
          {sidebar.map((section) => (
            <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
