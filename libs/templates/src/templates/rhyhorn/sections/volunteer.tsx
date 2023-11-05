import { Volunteer as IVolunteer } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { isUrl } from "@reactive-resume/utils";
import { Fragment } from "react";

import { SectionBase } from "../shared/section-base";

export const Volunteer = () => {
  const section = useStore((state) => state.sections.volunteer);

  return (
    <SectionBase<IVolunteer>
      section={section}
      header={(item) => (
        <Fragment>
          <div>
            {isUrl(item.url.href) ? (
              <a href={item.url.href} target="_blank" rel="noopener noreferrer nofollow">
                <h6>{item.organization}</h6>
              </a>
            ) : (
              <h6>{item.organization}</h6>
            )}
            <p>{item.position}</p>
          </div>

          <div>
            <h6>{item.date}</h6>
            <p>{item.location}</p>
          </div>
        </Fragment>
      )}
      main={(item) => <div dangerouslySetInnerHTML={{ __html: item.summary }} />}
    />
  );
};
