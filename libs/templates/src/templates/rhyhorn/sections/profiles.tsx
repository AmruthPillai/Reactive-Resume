import { Profile as IProfile } from "@reactive-resume/schema";
import { useStore } from "@reactive-resume/templates";
import { isUrl } from "@reactive-resume/utils";
import { Fragment } from "react";
import styled from "styled-components";

import { SectionBase } from "../shared/section-base";

const Username = styled.h6`
  line-height: 1;
  font-weight: 500;
`;

export const Profiles = () => {
  const section = useStore((state) => state.sections.profiles);

  return (
    <SectionBase<IProfile>
      section={section}
      header={(item) => (
        <Fragment>
          <div>
            {item.icon && (
              <i>
                <img
                  width="16"
                  height="16"
                  alt={item.network}
                  src={`https://cdn.simpleicons.org/${item.icon}`}
                />
              </i>
            )}

            {isUrl(item.url.href) ? (
              <a href={item.url.href} target="_blank" rel="noopener noreferrer nofollow">
                <Username>{item.username}</Username>
              </a>
            ) : (
              <Username>{item.username}</Username>
            )}
            <small>{item.network}</small>
          </div>

          <div />
        </Fragment>
      )}
    />
  );
};
