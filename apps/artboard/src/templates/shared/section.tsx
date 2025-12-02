import type {
  Award,
  Certification,
  CustomSection,
  CustomSectionGroup,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  SectionKey,
  SectionWithItem,
  Skill,
  URL,
} from "@reactive-resume/schema";
import { Education, Experience, Volunteer } from "@reactive-resume/schema";
import { cn, isEmptyString, isUrl, linearTransform, sanitize } from "@reactive-resume/utils";
import get from "lodash.get";
import { Fragment } from "react";

type RatingProps = { level: number };

const Rating = ({ level }: RatingProps) => (
  <div className="relative h-1 w-[128px] group-[.sidebar]:mx-auto">
    <div className="absolute inset-0 h-1 w-[128px] rounded bg-primary opacity-25" />
    <div
      className="absolute inset-0 h-1 rounded bg-primary"
      style={{ width: linearTransform(level, 0, 5, 0, 128) }}
    />
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
    <div className="flex items-center gap-x-1.5 break-all">
      {!iconOnRight && (icon ?? <i className="ph ph-bold ph-link text-primary" />)}
      <a
        href={url.href}
        target="_blank"
        rel="noreferrer noopener nofollow"
        className={cn("line-clamp-1 max-w-fit", className)}
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

export const LinkedEntity = ({ name, url, separateLinks, className }: LinkedEntityProps) => {
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

export const Section = <T,>({
  section,
  children,
  className,
  urlKey,
  levelKey,
  summaryKey,
  keywordsKey,
}: SectionProps<T>) => {
  if (!section.visible || section.items.filter((item) => item.visible).length === 0) return null;

  return (
    <section id={section.id} className="grid">
      <div className="mb-2 hidden font-bold text-primary group-[.main]:block">
        <h4>{section.name}</h4>
      </div>

      <div className="mx-auto mb-2 hidden items-center gap-x-2 text-center font-bold text-primary group-[.sidebar]:flex">
        <div className="size-1.5 rounded-full border border-primary" />
        <h4>{section.name}</h4>
        <div className="size-1.5 rounded-full border border-primary" />
      </div>

      <div
        className="grid gap-x-6 gap-y-3 group-[.sidebar]:mx-auto group-[.sidebar]:text-center"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items
          .filter((item) => item.visible)
          .map((item) => {
            const url = (urlKey && get(item, urlKey)) as URL | undefined;
            const level = (levelKey && get(item, levelKey, 0)) as number | undefined;
            const summary = (summaryKey && get(item, summaryKey, "")) as string | undefined;
            const keywords = (keywordsKey && get(item, keywordsKey, [])) as string[] | undefined;

            return (
              <div
                key={item.id}
                className={cn(
                  "relative space-y-2",
                  "border-primary group-[.main]:border-l group-[.main]:pl-4",
                  className,
                )}
              >
                <div>{children?.(item as T)}</div>

                {summary !== undefined && !isEmptyString(summary) && (
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
                    className="wysiwyg"
                  />
                )}

                {level !== undefined && level > 0 && <Rating level={level} />}

                {keywords !== undefined && keywords.length > 0 && (
                  <p className="text-sm">{keywords.join(", ")}</p>
                )}

                {url !== undefined && section.separateLinks && <Link url={url} />}

                <div className="absolute left-[-4.5px] top-px hidden size-[8px] rounded-full bg-primary group-[.main]:block" />
              </div>
            );
          })}
      </div>
    </section>
  );
};
