import {
  CustomSection as ICustomSection,
  CustomSectionItem,
  SectionKey,
} from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { isUrl } from "@reactive-resume/utils";
import get from "lodash.get";

import { SectionBase } from "../shared/section-base";

type Props = {
  id: SectionKey;
};

export const CustomSection = ({ id }: Props) => {
  const section = useStore((state) => get(state.sections, id));

  if (!section) return null;

  return (
    // @ts-expect-error Unable to infer type of Custom Section accurately, ignoring for now
    <SectionBase<ICustomSection>
      section={section}
      header={(item: CustomSectionItem) => (
        <>
          <div>
            <h6>{item.name}</h6>
            <p>{item.description}</p>
          </div>

          <div>
            <h6>{item.date}</h6>
            <p>{item.location}</p>
          </div>
        </>
      )}
      main={(item: CustomSectionItem) => <div dangerouslySetInnerHTML={{ __html: item.summary }} />}
      footer={(item: CustomSectionItem) => (
        <>
          <small>{item.keywords.join(", ")}</small>

          <div>
            {isUrl(item.url.href) && (
              <a href={item.url.href} target="_blank" rel="noopener noreferrer nofollow">
                <h6>{item.url.label || item.url.href}</h6>
              </a>
            )}
          </div>
        </>
      )}
    />
  );
};
