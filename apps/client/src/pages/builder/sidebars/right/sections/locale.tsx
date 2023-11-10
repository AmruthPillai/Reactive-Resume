import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Combobox, Label } from "@reactive-resume/ui";
import { useMemo } from "react";

import { dynamicActivate, getLocales } from "@/client/libs/lingui";
import { useResumeStore } from "@/client/stores/resume";

import { getSectionIcon } from "../shared/section-icon";

export const LocaleSection = () => {
  const { _ } = useLingui();

  const setValue = useResumeStore((state) => state.setValue);
  const locale = useResumeStore((state) => state.resume.data.metadata.locale);

  const options = useMemo(() => {
    return Object.entries(getLocales()).map(([value, label]) => ({
      label,
      value,
    }));
  }, [_]);

  const onChangeLanguage = async (value: string) => {
    setValue("metadata.locale", value);
    await dynamicActivate(value);

    // Update resume section titles with new locale
  };

  return (
    <section id="locale" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {getSectionIcon("locale")}
          <h2 className="line-clamp-1 text-3xl font-bold">{t`Locale`}</h2>
        </div>
      </header>

      <main className="grid gap-y-4">
        <div className="space-y-1.5">
          <Label>{t`Language`}</Label>
          <Combobox value={locale} onValueChange={onChangeLanguage} options={options} />
        </div>
      </main>
    </section>
  );
};
