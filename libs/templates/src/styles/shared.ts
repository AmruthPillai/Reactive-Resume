import { Metadata } from "@reactive-resume/schema";
import { pageSizeMap } from "@reactive-resume/utils";
import { css } from "styled-components";

export type GlobalStyleProps = {
  $css: Metadata["css"];
  $page: Metadata["page"];
  $theme: Metadata["theme"];
  $typography: Metadata["typography"];
};

export const Shared = css<GlobalStyleProps>`
  /* CSS Variables */
  :root {
    /* Theme */
    --color-text: ${({ $theme }) => $theme.text};
    --color-primary: ${({ $theme }) => $theme.primary};
    --color-background: ${({ $theme }) => $theme.background};

    /* Page */
    --page-width: ${({ $page }) => pageSizeMap[$page.format].width}mm;
    --page-height: ${({ $page }) => pageSizeMap[$page.format].height}mm;
    --page-margin: ${({ $page }) => $page.margin}px;

    /* Typography */
    --font-size: ${({ $typography }) => $typography.font.size}px;
    --font-family: ${({ $typography }) => $typography.font.family};
    --line-height: ${({ $typography }) => $typography.lineHeight}rem;
  }

  /* Headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    line-height: var(--line-height);
  }

  h1 {
    font-size: 2rem;
    line-height: calc(var(--line-height) + 1.5rem);
  }

  h2 {
    font-size: 1.5rem;
    line-height: calc(var(--line-height) + 1rem);
  }

  h3 {
    font-size: 1rem;
    line-height: calc(var(--line-height) + 0rem);
  }

  /* Paragraphs */
  p {
    font-size: var(--font-size);
    line-height: var(--line-height);
  }

  b,
  strong {
    font-weight: bold;
  }

  small {
    font-size: calc(var(--font-size) - 2px);
    line-height: calc(var(--line-height) - 0.5rem);
  }

  i,
  em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
    text-underline-offset: 1.5px;
  }

  a {
    text-decoration: ${({ $typography }) => ($typography.underlineLinks ? "underline" : "none")};
    text-underline-offset: 1.5px;
  }

  s,
  del {
    text-decoration: line-through;
  }

  pre,
  code {
    font-family: monospace;
  }

  pre code {
    display: block;
    padding: 1rem;
    border-radius: 4px;
    color: white;
    background-color: black;
  }

  mark {
    color: black;
    background-color: #fcd34d;
  }

  /* Lists */
  menu,
  ol,
  ul {
    list-style: disc inside;

    li {
      margin: 0.25rem 0;
      line-height: var(--line-height);

      p {
        display: inline;
        line-height: var(--line-height);
      }
    }

    menu,
    ol,
    ul {
      list-style: circle inside;

      li {
        padding-left: 32px;
      }
    }
  }

  /* Horizontal Rules */
  hr {
    margin: 0.5rem 0;
    border: 0.5px solid currentColor;
  }

  /* Images */
  img {
    display: block;
    max-width: 100%;
    object-fit: cover;
  }
`;
