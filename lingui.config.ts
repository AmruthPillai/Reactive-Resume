import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  format: "po",
  sourceLocale: "en-US",
  pseudoLocale: "zu-ZA",
  locales: ["en-US", "de-DE", "zu-ZA"],
  catalogs: [
    {
      path: "<rootDir>/apps/client/src/locales/{locale}/messages",
      include: ["<rootDir>/apps/client/src"],
    },
  ],
};

export default config;
