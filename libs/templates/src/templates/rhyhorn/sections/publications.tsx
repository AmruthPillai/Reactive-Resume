import { Publication as IPublication } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { isUrl } from "@reactive-resume/utils";

import { SectionBase } from "../shared/section-base";

export const Publications = () => {
  const section = useStore((state) => state.sections.publications);

  return (
    <SectionBase<IPublication>
      section={section}
      header={(item) => (
        <>
          <div>
            <h6>{item.name}</h6>
            <p>{item.publisher}</p>
          </div>

          <div>
            <h6>{item.date}</h6>
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
