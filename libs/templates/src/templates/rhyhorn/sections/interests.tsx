import { Interest as IInterest } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { Fragment } from "react";

import { SectionBase } from "../shared/section-base";

export const Interests = () => {
  const section = useStore((state) => state.sections.interests);

  return (
    <SectionBase<IInterest>
      section={section}
      header={(item) => (
        <Fragment>
          <div>
            <h6>{item.name}</h6>
            <p>{item.keywords.join(", ")}</p>
          </div>

          <div />
        </Fragment>
      )}
    />
  );
};
