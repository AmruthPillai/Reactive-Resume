import { createGlobalStyle } from "styled-components";

import { Reset } from "./reset";
import { GlobalStyleProps, Shared } from "./shared";

export const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  ${Reset}
  ${Shared}
`;

export * from "./grid";
export * from "./page";
export * from "./picture";
