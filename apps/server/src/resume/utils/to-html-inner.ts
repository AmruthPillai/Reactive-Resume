import { ResumeData } from "@reactive-resume/schema";

export const toInnerHtml = (data: ResumeData): ResumeData => {
  // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
  let htmlSections = data.sections;
  for (const section of Object.keys(htmlSections) as (keyof typeof htmlSections)[]) {
    if (section === "summary") {
      htmlSections[section].content = htmlSections[section].content
        .split("\n")
        .map((s: string) => `<p>${s}</p>`)
        .join("");
    } else {
      if (Array.isArray(htmlSections[section].items)) {
        for (const item of htmlSections[section].items) {
          if ("summary" in item && typeof item.summary === "string") {
            item.summary = item.summary
              .split("\n")
              .map((s: string) => `<p>${s}</p>`)
              .join("");
          }
        }
      }
    }
  }
  return {
    ...data,
    sections: htmlSections,
  };
};
