import { validate } from 'uuid';

export const sectionScrollIntoView = (id: string) => {
  const elementId = validate(id) ? `#section-${id}` : `#${id}`;
  const section = document.querySelector(elementId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const resumePreviewScrollIntoView = (template: string, sectionId: string) => {
  const elementId = `#${template}_${sectionId}`;
  const section = document.querySelector(elementId);

  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};
