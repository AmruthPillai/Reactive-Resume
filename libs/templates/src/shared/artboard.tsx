import { ResumeData } from "@reactive-resume/schema";
import { useEffect, useMemo } from "react";
import { FrameContextConsumer } from "react-frame-component";
import { StyleSheetManager } from "styled-components";

import { GlobalStyles } from "../styles";
import { GlobalStyleProps } from "../styles/shared";
import { FrameWrapper } from "./frame";
import { useStore } from "./store";

type Props = {
  resume: ResumeData;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export const Artboard = ({ resume, style, children }: Props) => {
  const store = useStore();
  const metadata = useStore((state) => state.metadata);

  const styles: GlobalStyleProps | null = useMemo(() => {
    if (!metadata) return null;

    return {
      $css: metadata.css,
      $page: metadata.page,
      $theme: metadata.theme,
      $typography: metadata.typography,
    };
  }, [metadata]);

  useEffect(() => useStore.setState(resume), [resume]);

  if (Object.keys(store).length === 0 || !styles) return;

  return (
    <FrameWrapper style={style}>
      <FrameContextConsumer>
        {({ document }) => (
          <StyleSheetManager target={document?.head}>
            <GlobalStyles {...styles} />

            {children}
          </StyleSheetManager>
        )}
      </FrameContextConsumer>
    </FrameWrapper>
  );
};
