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
        text: "var(--color-text)",
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
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
