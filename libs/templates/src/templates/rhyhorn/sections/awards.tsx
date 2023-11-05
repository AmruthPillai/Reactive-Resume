import { Award as IAward } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { isUrl } from "@reactive-resume/utils";
import { Fragment } from "react";

import { SectionBase } from "../shared/section-base";

export const Awards = () => {
  const section = useStore((state) => state.sections.awards);

  return (
    <SectionBase<IAward>
      section={section}
      header={(item) => (
        <Fragment>
          <div>
            {isUrl(item.url.href) ? (
              <a href={item.url.href} target="_blank" rel="noopener noreferrer nofollow">
                <h6>{item.title}</h6>
              </a>
            ) : (
              <h6>{item.title}</h6>
            )}
            <p>{item.awarder}</p>
          </div>

          <div>
            <h6>{item.date}</h6>
          </div>
        </Fragment>
      )}
      main={(item) => <div dangerouslySetInnerHTML={{ __html: item.summary }} />}
    />
  );
};
