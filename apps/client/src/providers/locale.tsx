import "@/client/libs/dayjs";

import { i18n } from "@lingui/core";
import { detect, fromNavigator, fromStorage, fromUrl } from "@lingui/detect-locale";
import { I18nProvider } from "@lingui/react";
import { useEffect } from "react";

import { defaultLocale, dynamicActivate } from "../libs/lingui";

type Props = {
  children: React.ReactNode;
};

export const LocaleProvider = ({ children }: Props) => {
  useEffect(() => {
    const detectedLocale = detect(
      fromUrl("lang"),
      fromStorage("lang"),
      fromNavigator(),
      defaultLocale,
    )!;

    dynamicActivate(detectedLocale);
  }, []);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
