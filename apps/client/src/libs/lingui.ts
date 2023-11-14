import { i18n } from "@lingui/core";

export const defaultLocale = "en-US";

export async function dynamicActivate(locale: string) {
  const { messages } = await import(`../locales/${locale}/messages.po`);
  i18n.loadAndActivate({ locale, messages });
}
