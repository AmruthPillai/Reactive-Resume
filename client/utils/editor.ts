import { validate } from 'uuid';

export const sectionScrollIntoView = (id: string) => {
  const elementId = validate(id) ? `#section-${id}` : `#${id}`;
  const section = document.querySelector(elementId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
