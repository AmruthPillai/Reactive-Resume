import { useStore } from "@reactive-resume/templates";

import { Heading } from "../shared/heading";

export const Summary = () => {
  const section = useStore((state) => state.sections.summary);

  if (!section.visible || !section.content) return null;

  return (
    <section id={section.id} className={`section section__${section.id}`}>
      <Heading>{section.name}</Heading>

      <main className="section__item-content">
        <div
          style={{ columns: section.columns }}
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </main>
    </section>
  );
};
