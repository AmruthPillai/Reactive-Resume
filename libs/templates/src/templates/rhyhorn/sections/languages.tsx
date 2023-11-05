import { Language as ILanguage } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { getCEFRLevel } from "@reactive-resume/utils";
import { Fragment } from "react";

import { SectionBase } from "../shared/section-base";

export const Languages = () => {
  const section = useStore((state) => state.sections.languages);

  return (
    <SectionBase<ILanguage>
      section={section}
      header={(item) => (
        <Fragment>
          <div>
            <h6>{item.name}</h6>
            <p>{item.fluency || getCEFRLevel(item.fluencyLevel)}</p>
          </div>

          <div />
        </Fragment>
      )}
    />
  );
};
