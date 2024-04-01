const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    join(__dirname, "{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        background: "var(--color-background)",
      },
      lineHeight: {
        tight: "calc(var(--line-height) - 0.5)",
        snug: "calc(var(--line-height) - 0.3)",
        normal: "var(--line-height)",
        relaxed: "calc(var(--line-height) + 0.3)",
        loose: "calc(var(--line-height) + 0.5)",
      },
      spacing: { custom: "var(--margin)" },
      typography: () => ({
        foreground: {
          css: {
            "--tw-prose-body": "var(--color-foreground)",
            "--tw-prose-headings": "var(--color-foreground)",
            "--tw-prose-lead": "var(--color-foreground)",
            "--tw-prose-links": "var(--color-foreground)",
            "--tw-prose-bold": "var(--color-foreground)",
            "--tw-prose-counters": "var(--color-foreground)",
            "--tw-prose-bullets": "var(--color-foreground)",
            "--tw-prose-hr": "var(--color-foreground)",
            "--tw-prose-quotes": "var(--color-foreground)",
            "--tw-prose-quote-borders": "var(--color-foreground)",
            "--tw-prose-captions": "var(--color-foreground)",
            "--tw-prose-code": "var(--color-foreground)",
            "--tw-prose-pre-code": "var(--color-foreground)",
            "--tw-prose-pre-bg": "var(--color-background)",
            "--tw-prose-th-borders": "var(--color-foreground)",
            "--tw-prose-td-borders": "var(--color-foreground)",
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
