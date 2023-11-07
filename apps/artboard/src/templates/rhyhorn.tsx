import { SectionKey } from "@reactive-resume/schema";
import { cn, isEmptyString, isUrl } from "@reactive-resume/utils";
import { Fragment } from "react";

import { Picture } from "../components/picture";
import { useArtboardStore } from "../store/artboard";
import { TemplateProps } from "../types/template";

const fieldDisplay = cn("flex items-center gap-x-1.5 border-r pr-2 last:border-r-0 last:pr-0");

const Header = () => {
  const basics = useArtboardStore((state) => state.resume.basics);

  return (
    <div className="flex items-center space-x-4">
      <Picture />

      <div className="space-y-0.5">
        <div className="text-2xl font-bold leading-tight">{basics.name}</div>
        <div className="text-base">{basics.headline}</div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
          {basics.location && (
            <div className={cn(fieldDisplay)}>
              <i className="ph ph-map-pin" />
              <div>{basics.location}</div>
            </div>
          )}
          {basics.phone && (
            <div className={cn(fieldDisplay)}>
              <i className="ph ph-phone" />
              <a href={`tel:${basics.phone}`} target="_blank" rel="noreferrer">
                {basics.phone}
              </a>
            </div>
          )}
          {basics.email && (
            <div className={cn(fieldDisplay)}>
              <i className="ph ph-envelope" />
              <a href={`mailto:${basics.email}`} target="_blank" rel="noreferrer">
                {basics.email}
              </a>
            </div>
          )}
          {isUrl(basics.url.href) && (
            <div className={cn(fieldDisplay)}>
              <i className="ph ph-globe" />
              <a href={basics.url.href} target="_blank" rel="noreferrer">
                {basics.url.label || basics.url.href}
              </a>
            </div>
          )}
          {basics.customFields.map((item) => (
            <div key={item.id} className={cn(fieldDisplay)}>
              <i className={`ph ph-${item.icon}`} />
              <span>{[item.name, item.value].filter(Boolean).join(": ")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const sectionHeading = cn("mb-1.5 mt-3 border-b pb-0.5 text-sm font-bold uppercase");

const Profiles = () => {
  const section = useArtboardStore((state) => state.resume.sections.profiles);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="mt-2 grid items-center"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="flex items-center gap-x-3">
            <img
              width="16"
              height="16"
              alt={item.network}
              src={`https://cdn.simpleicons.org/${item.icon}`}
            />

            <div className="leading-tight">
              {isUrl(item.url.href) ? (
                <a href={item.url.href} target="_blank" rel="noreferrer" className="font-medium">
                  {item.url.label || item.username}
                </a>
              ) : (
                <span className="font-medium">{item.username}</span>
              )}

              <p className="text-sm">{item.network}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Summary = () => {
  const section = useArtboardStore((state) => state.resume.sections.summary);

  if (!section.visible || !section.content) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      {!isEmptyString(section.content) && (
        <main>
          <div
            className="wysiwyg"
            style={{ columns: section.columns }}
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </main>
      )}
    </section>
  );
};

const Experience = () => {
  const section = useArtboardStore((state) => state.resume.sections.experience);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id}>
            <header className="mb-2 flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.company}</div>
                <div>{item.position}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>

              <div className="shrink-0 text-right">
                <div className="font-bold">{item.date}</div>
                <div>{item.location}</div>
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Education = () => {
  const section = useArtboardStore((state) => state.resume.sections.education);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id}>
            <header className="mb-2 flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.institution}</div>
                <div>{item.area}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>

              <div className="shrink-0 text-right">
                <div className="font-bold">{item.date}</div>
                <div>{item.studyType}</div>
                <div>{item.score}</div>
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Awards = () => {
  const section = useArtboardStore((state) => state.resume.sections.awards);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.title}</div>
                <div>{item.awarder}</div>
              </div>

              <div className="shrink-0 text-right">
                <div className="font-bold">{item.date}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Certifications = () => {
  const section = useArtboardStore((state) => state.resume.sections.certifications);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.name}</div>
                <div>{item.issuer}</div>
              </div>

              <div className="shrink-0 text-right">
                <div className="font-bold">{item.date}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Skills = () => {
  const section = useArtboardStore((state) => state.resume.sections.skills);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.name}</div>
                <div>{item.description}</div>
              </div>
            </header>

            {item.keywords.length > 0 && (
              <footer>
                <p className="text-sm">{item.keywords.join(", ")}</p>
              </footer>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id}>
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.name}</div>
              </div>
            </header>

            {item.keywords.length > 0 && (
              <footer>
                <p className="text-sm">{item.keywords.join(", ")}</p>
              </footer>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Publications = () => {
  const section = useArtboardStore((state) => state.resume.sections.publications);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.name}</div>
                <div>{item.publisher}</div>
              </div>

              <div className="shrink-0 text-right">
                <div className="font-bold">{item.date}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Volunteer = () => {
  const section = useArtboardStore((state) => state.resume.sections.volunteer);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id}>
            <header className="mb-2 flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.organization}</div>
                <div>{item.position}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>

              <div className="shrink-0 text-right">
                <div className="font-bold">{item.date}</div>
                <div>{item.location}</div>
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Languages = () => {
  const section = useArtboardStore((state) => state.resume.sections.languages);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.name}</div>
                <div>{item.fluency}</div>
              </div>
            </header>
          </div>
        ))}
      </div>
    </section>
  );
};

const Projects = () => {
  const section = useArtboardStore((state) => state.resume.sections.projects);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.name}</div>
                <div>{item.description}</div>
              </div>

              <div className="shrink-0 text-right">
                <div className="font-bold">{item.date}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}

            {item.keywords.length > 0 && (
              <footer>
                <p className="text-sm">{item.keywords.join(", ")}</p>
              </footer>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const References = () => {
  const section = useArtboardStore((state) => state.resume.sections.references);

  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.name}</div>
                <div>{item.description}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const Custom = ({ id }: { id: string }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);

  if (!section || !section.visible || !section.items.length) return null;

  return (
    <section id={section.id}>
      <h4 className={cn(sectionHeading)}>{section.name}</h4>

      <div
        className="grid items-start gap-x-4 gap-y-2"
        style={{ gridTemplateColumns: `repeat(${section.columns}, 1fr)` }}
      >
        {section.items.map((item) => (
          <div key={item.id} className="space-y-2">
            <header className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-bold">{item.name}</div>
                <div>{item.description}</div>
                {isUrl(item.url.href) && (
                  <div>
                    <a href={item.url.href} target="_blank" rel="noreferrer">
                      {item.url.label || item.url.href}
                    </a>
                  </div>
                )}
              </div>

              <div className="shrink-0 text-right">
                <div className="font-bold">{item.date}</div>
                <div>{item.location}</div>
              </div>
            </header>

            {!isEmptyString(item.summary) && (
              <main>
                <div className="wysiwyg" dangerouslySetInnerHTML={{ __html: item.summary }} />
              </main>
            )}

            {item.keywords.length > 0 && (
              <footer>
                <p className="text-sm">{item.keywords.join(", ")}</p>
              </footer>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const mapSectionToComponent = (section: SectionKey) => {
  switch (section) {
    case "profiles":
      return <Profiles />;
    case "summary":
      return <Summary />;
    case "experience":
      return <Experience />;
    case "education":
      return <Education />;
    case "awards":
      return <Awards />;
    case "certifications":
      return <Certifications />;
    case "skills":
      return <Skills />;
    case "interests":
      return <Interests />;
    case "publications":
      return <Publications />;
    case "volunteer":
      return <Volunteer />;
    case "languages":
      return <Languages />;
    case "projects":
      return <Projects />;
    case "references":
      return <References />;
    default:
      if (section.startsWith("custom.")) return <Custom id={section.split(".")[1]} />;

      return <p>{section}</p>;
  }
};

export const Rhyhorn = ({ columns, isFirstPage = false }: TemplateProps) => {
  const [main, sidebar] = columns;

  return (
    <div className="space-y-4">
      {isFirstPage && <Header />}

      <div className="space-y-2">
        {main.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}

        {sidebar.map((section) => (
          <Fragment key={section}>{mapSectionToComponent(section)}</Fragment>
        ))}
      </div>
    </div>
  );
};
