import { Reference as IReference } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { isUrl } from "@reactive-resume/utils";
import { Fragment } from "react";

import { SectionBase } from "../shared/section-base";

export const References = () => {
  const section = useStore((state) => state.sections.references);

  return (
    <SectionBase<IReference>
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

          <div />
        </Fragment>
      )}
      main={(item) => <div dangerouslySetInnerHTML={{ __html: item.summary }} />}
    />
  );
};
