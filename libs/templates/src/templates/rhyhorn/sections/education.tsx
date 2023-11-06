import { Education as IEducation } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { isUrl } from "@reactive-resume/utils";

import { SectionBase } from "../shared/section-base";

export const Education = () => {
  const section = useStore((state) => state.sections.education);

  return (
    <SectionBase<IEducation>
      section={section}
      header={(item) => (
        <>
          <div>
            <h6>{item.institution}</h6>
            <p>{item.area}</p>
          </div>

          <div>
            <h6>{item.date}</h6>
            <p>
              {item.studyType}
              {item.score ? ` | ${item.score}` : ""}
            </p>
          </div>
        </>
      )}
      main={(item) => <div dangerouslySetInnerHTML={{ __html: item.summary }} />}
      footer={(item) => (
        <div>
          {isUrl(item.url.href) && (
            <a href={item.url.href} target="_blank" rel="noopener noreferrer nofollow">
              <h6>{item.url.label || item.url.href}</h6>
            </a>
          )}
        </div>
      )}
    />
  );
};
