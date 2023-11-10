import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  format: "po",
  sourceLocale: "en-US",
  locales: ["en-US", "de-DE"],
  catalogs: [
    {
      path: "<rootDir>/apps/client/src/locales/{locale}/messages",
      include: ["<rootDir>/apps/client/src"],
    },
  ],
};

export default config;
