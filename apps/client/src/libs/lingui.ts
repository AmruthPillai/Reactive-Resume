import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";

export const defaultLocale = "en-US";

export const getLocales = () => ({
  "en-US": t`English`,
  "de-DE": t`German`,
});

export async function dynamicActivate(locale: string) {
  const { messages } = await import(`../locales/${locale}/messages.po`);

  i18n.load(locale, messages);
  i18n.activate(locale);
}
