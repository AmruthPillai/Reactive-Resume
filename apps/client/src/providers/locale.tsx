import "@/client/libs/dayjs";

import { i18n } from "@lingui/core";
import { detect, fromNavigator, fromUrl } from "@lingui/detect-locale";
import { I18nProvider } from "@lingui/react";
import get from "lodash.get";
import { useEffect } from "react";

import { defaultLocale, dynamicActivate } from "../libs/lingui";
import { useAuthStore } from "../stores/auth";
import { useResumeStore } from "../stores/resume";

type Props = {
  children: React.ReactNode;
};

export const LocaleProvider = ({ children }: Props) => {
  const userLocale = useAuthStore((state) => get(state.user, "locale", null));
  const resumeLocale = useResumeStore((state) => get(state.resume, "data.metadata.locale", null));

  useEffect(() => {
    const detectedLocale = detect(
      resumeLocale,
      userLocale,
      fromUrl("lang"),
      fromNavigator(),
      defaultLocale,
    )!;

    dynamicActivate(detectedLocale);
  }, [userLocale, resumeLocale]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
