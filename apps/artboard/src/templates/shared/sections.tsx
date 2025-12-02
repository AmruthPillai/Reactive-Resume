import type {
  Award,
  Certification,
  CustomSection as CustomSectionType,
  CustomSectionGroup,
  Interest,
  Language,
  Profile,
  Project,
  Publication,
  Reference,
  SectionKey,
  Skill,
} from "@reactive-resume/schema";
import { Education, Experience, Volunteer } from "@reactive-resume/schema";
import { Fragment } from "react";

import { BrandIcon } from "../../components/brand-icon";
import { useArtboardStore } from "../../store/artboard";

import { LinkedEntity, Section } from "./section";

export const Profiles = () => {
  const section = useArtboardStore((state) => state.resume.sections.profiles);

  return (
    <Section<Profile> section={section}>
      {(item) => (
        <div>
          {item.url.href ? (
            <div className="flex items-center gap-x-1.5">
              <BrandIcon slug={item.icon} className="size-4" />
              <a
                href={item.url.href}
                target="_blank"
                rel="noreferrer noopener nofollow"
                className="font-bold"
              >
                {item.username}
              </a>
            </div>
          ) : (
            <p className="font-bold">{item.username}</p>
          )}
          {!item.icon && <p className="text-sm">{item.network}</p>}
        </div>
      )}
    </Section>
  );
};

export const ExperienceSection = () => {
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
          <div className="font-bold">{item.position}</div>
          <div>{item.location}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

export const EducationSection = () => {
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
          <div className="font-bold">{item.area}</div>
          <div>{item.score}</div>
          <div>{item.studyType}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

export const Awards = () => {
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

export const Certifications = () => {
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

export const Skills = () => {
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

export const Interests = () => {
  const section = useArtboardStore((state) => state.resume.sections.interests);

  return (
    <Section<Interest> section={section} keywordsKey="keywords" className="space-y-0.5">
      {(item) => <div className="font-bold">{item.name}</div>}
    </Section>
  );
};

export const Publications = () => {
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

export const VolunteerSection = () => {
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
          <div className="font-bold">{item.position}</div>
          <div>{item.location}</div>
          <div className="font-bold">{item.date}</div>
        </div>
      )}
    </Section>
  );
};

export const Languages = () => {
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

export const Projects = () => {
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

export const References = () => {
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

export const CustomSection = ({ id }: { id: string }) => {
  const section = useArtboardStore((state) => state.resume.sections.custom[id]);

  return (
    <Section<CustomSectionType>
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
            <div className="font-bold">{item.date}</div>
            <div>{item.location}</div>
          </div>
        </div>
      )}
    </Section>
  );
};

export const mapSectionToComponent = (section: SectionKey) => {
  switch (section) {
    case "profiles":
      return <Profiles />;
    case "summary": {
      const summarySection = useArtboardStore((state) => state.resume.sections.summary);

      if (!summarySection.visible || !summarySection.content) return null;

      return (
        <section id={summarySection.id}>
          <div className="mb-2 hidden font-bold text-primary group-[.main]:block">
            <h4>{summarySection.name}</h4>
          </div>

          <div className="mb-2 hidden items-center gap-x-2 text-center font-bold text-primary group-[.sidebar]:flex">
            <div className="size-1.5 rounded-full border border-primary" />
            <h4>{summarySection.name}</h4>
            <div className="size-1.5 rounded-full border border-primary" />
          </div>

          <main className="relative space-y-2 border-l border-primary pl-4">
            <div className="absolute left-[-4.5px] top-[8px] hidden size-[8px] rounded-full bg-primary group-[.main]:block" />

            <div
              dangerouslySetInnerHTML={{ __html: summarySection.content }}
              style={{ columns: summarySection.columns }}
              className="wysiwyg"
            />
          </main>
        </section>
      );
    }
    case "experience":
      return <ExperienceSection />;
    case "education":
      return <EducationSection />;
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
      return <VolunteerSection />;
    case "languages":
      return <Languages />;
    case "projects":
      return <Projects />;
    case "references":
      return <References />;
    default:
      if (section.startsWith("custom.")) return <CustomSection id={section.split(".")[1]} />;

      return null;
  }
};
