import { Project as IProject } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { isUrl } from "@reactive-resume/utils";
import { Fragment } from "react";

import { SectionBase } from "../shared/section-base";

export const Projects = () => {
  const section = useStore((state) => state.sections.projects);

  return (
    <SectionBase<IProject>
      section={section}
      header={(item) => (
        <Fragment>
          <div>
            {isUrl(item.url.href) ? (
              <a href={item.url.href} target="_blank" rel="noopener noreferrer nofollow">
                <h6>{item.name}</h6>
              </a>
            ) : (
              <h6>{item.name}</h6>
            )}
            <p>{item.description}</p>
          </div>

          <div>
            <h6>{item.date}</h6>
          </div>
        </Fragment>
      )}
      main={(item) => <div dangerouslySetInnerHTML={{ __html: item.summary }} />}
      footer={(item) => <small>{item.keywords.join(", ")}</small>}
    />
  );
};
