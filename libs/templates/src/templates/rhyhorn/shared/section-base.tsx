import { Item, SectionItem, SectionWithItem } from "@reactive-resume/schema";
import { ItemGrid } from "@reactive-resume/templates";

import { Heading } from "./heading";

type Props<T extends Item> = {
  section: SectionWithItem<T>;
  header?: (item: T) => React.ReactNode;
  main?: (item: T) => React.ReactNode;
  footer?: (item: T) => React.ReactNode;
};

export const SectionBase = <T extends SectionItem>({ section, header, main, footer }: Props<T>) => {
  if (!section.visible || !section.items.length) return null;

  return (
    <section id={section.id} className={`section section__${section.id}`}>
      <Heading>{section.name}</Heading>

      <ItemGrid className="section__items" $columns={section.columns}>
        {section.items
          .filter((item) => !!item.visible)
          .map((item) => (
            <div key={item.id} className="section__item">
              {header && <header className="section__item-header">{header(item as T)}</header>}
              {main && <main className="section__item-main">{main(item as T)}</main>}
              {footer && <footer className="section__item-footer">{footer(item as T)}</footer>}
            </div>
          ))}
      </ItemGrid>
    </section>
  );
};
