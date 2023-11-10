import type { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  locales: ["en-US", "de-DE"],
  sourceLocale: "en-US",
  catalogs: [
    {
      path: "<rootDir>/apps/client/src/locales/{locale}",
      include: ["<rootDir>/apps/client/src"],
    },
  ],
};

export default config;
