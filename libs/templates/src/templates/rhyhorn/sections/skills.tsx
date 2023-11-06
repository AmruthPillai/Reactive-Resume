import { Skill as ISkill } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";

import { SectionBase } from "../shared/section-base";

export const Skills = () => {
  const section = useStore((state) => state.sections.skills);

  return (
    <SectionBase<ISkill>
      section={section}
      header={(item) => (
        <>
          <div>
            <h6>{item.name}</h6>
            <p>{item.description}</p>
          </div>

          <div />
        </>
      )}
      footer={(item) => <small>{item.keywords.join(", ")}</small>}
    />
  );
};
