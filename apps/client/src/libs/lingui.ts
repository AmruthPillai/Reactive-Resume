import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

import { axios } from "./axios";

type Locale = "en-US" | "de-DE" | "zu-ZA";

export const defaultLocale = "en-US";

export const getLocales = () => {
  const locales = {
    "en-US": t`English`,
    "de-DE": t`German`,
  } as Record<Locale, string>;

  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line lingui/no-unlocalized-strings
    locales["zu-ZA"] = "Pseudolocalization";
  }

  return locales;
};

export async function dynamicActivate(locale: string) {
  const response = await axios(`translation/${locale}`);
  const messages = await response.data;

  i18n.load(locale, messages);
  i18n.activate(locale);
}
