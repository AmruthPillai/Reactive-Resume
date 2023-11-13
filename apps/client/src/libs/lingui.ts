import { i18n } from "@lingui/core";

import { axios } from "./axios";

export const defaultLocale = "en-US";

axios(`translation/${defaultLocale}`).then((response) => {
  const messages = response.data;
  i18n.loadAndActivate({ locale: defaultLocale, messages });
});

export async function dynamicActivate(locale: string) {
  const response = await axios(`translation/${locale}`);
  const messages = response.data;

  i18n.loadAndActivate({ locale, messages });
}
