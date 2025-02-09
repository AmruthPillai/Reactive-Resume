/* eslint-disable lingui/no-unlocalized-strings */

import { t } from "@lingui/macro";
import type { ComboboxOption } from "@reactive-resume/ui";
import { Button, Combobox, Label, Slider, Switch } from "@reactive-resume/ui";
import { cn, fonts } from "@reactive-resume/utils";
import { useCallback, useEffect, useState } from "react";
import webfontloader from "webfontloader";

import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

const localFonts = ["Arial", "Cambria", "Garamond", "Times New Roman"];

const fontSuggestions = [
  ...localFonts,
  "IBM Plex Sans",
  "IBM Plex Serif",
  "Lato",
  "Lora",
  "Merriweather",
  "Open Sans",
  "Playfair Display",
  "PT Sans",
  "PT Serif",
  "Roboto Condensed",
];

const families = fonts.map((font) => ({
  value: font.family,
  label: font.family,
})) satisfies ComboboxOption[];

families.push(...localFonts.map((font) => ({ value: font, label: font })));

export const TypographySection = () => {
  const [subsets, setSubsets] = useState<ComboboxOption[]>([]);
  const [variants, setVariants] = useState<ComboboxOption[]>([]);

  const setValue = useResumeStore((state) => state.setValue);
  const typography = useResumeStore((state) => state.resume.data.metadata.typography);

  const loadFontSuggestions = useCallback(() => {
    for (const font of fontSuggestions) {
      if (localFonts.includes(font)) continue;

      webfontloader.load({
        events: false,
        classes: false,
        google: { families: [font], text: font },
      });
    }
  }, [fontSuggestions]);

  useEffect(() => {
    loadFontSuggestions();
  }, []);

  useEffect(() => {
    const subsets = fonts.find((font) => font.family === typography.font.family)?.subsets ?? [];
    if (subsets.length > 0) {
      setSubsets(subsets.map((subset) => ({ value: subset, label: subset })));
    }

    const variants = fonts.find((font) => font.family === typography.font.family)?.variants ?? [];
    if (variants.length > 0) {
      setVariants(variants.map((variant) => ({ value: variant, label: variant })));
    }
  }, [typography.font.family]);

  return (
    <section id="typography" className="grid gap-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="typography" size={18} name={t`Typography`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Typography`}</h2>
        </div>
      </header>

      <main className="grid gap-y-6">
        <div className="grid grid-cols-2 gap-4">
          {fontSuggestions
            .sort((a, b) => a.localeCompare(b))
            .map((font) => (
              <Button
                key={font}
                variant="outline"
                style={{ fontFamily: font }}
                disabled={typography.font.family === font}
                className={cn(
                  "flex h-12 items-center justify-center overflow-hidden rounded border text-center text-xs ring-primary transition-colors hover:bg-secondary-accent focus:outline-none focus:ring-1 disabled:opacity-100 lg:text-sm",
                  typography.font.family === font && "ring-1",
                )}
                onClick={() => {
                  setValue("metadata.typography.font.family", font);
                  setValue("metadata.typography.font.subset", "latin");
                  setValue("metadata.typography.font.variants", ["regular"]);
                }}
              >
                {font}
              </Button>
            ))}
        </div>

        <div className="space-y-1.5">
          <Label>{t`Font Family`}</Label>
          <Combobox
            options={families.sort((a, b) => a.label.localeCompare(b.label))}
            value={typography.font.family}
            searchPlaceholder={t`Search for a font family`}
            onValueChange={(value) => {
              setValue("metadata.typography.font.family", value);
              setValue("metadata.typography.font.subset", "latin");
              setValue("metadata.typography.font.variants", ["regular"]);
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <div className="space-y-1.5">
            <Label>{t`Font Subset`}</Label>
            <Combobox
              options={subsets}
              value={typography.font.subset}
              searchPlaceholder={t`Search for a font subset`}
              onValueChange={(value) => {
                setValue("metadata.typography.font.subset", value);
              }}
            />
          </div>

          <div className="space-y-1.5">
            <Label>{t`Font Variants`}</Label>
            <Combobox
              multiple
              options={variants}
              value={typography.font.variants}
              searchPlaceholder={t`Search for a font variant`}
              onValueChange={(value) => {
                setValue("metadata.typography.font.variants", value);
              }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{t`Font Size`}</Label>
          <div className="flex items-center gap-x-4 py-1">
            <Slider
              min={6}
              max={18}
              step={0.05}
              value={[typography.font.size]}
              onValueChange={(value) => {
                setValue("metadata.typography.font.size", value[0]);
              }}
            />

            <span className="text-base font-bold">{typography.font.size}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{t`Line Height`}</Label>
          <div className="flex items-center gap-x-4 py-1">
            <Slider
              min={0}
              max={3}
              step={0.05}
              value={[typography.lineHeight]}
              onValueChange={(value) => {
                setValue("metadata.typography.lineHeight", value[0]);
              }}
            />

            <span className="text-base font-bold">{typography.lineHeight}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{t`Options`}</Label>

          <div className="flex items-center gap-x-4 py-1">
            <Switch
              id="metadata.typography.hideIcons"
              checked={typography.hideIcons}
              onCheckedChange={(checked) => {
                setValue("metadata.typography.hideIcons", checked);
              }}
            />
            <Label htmlFor="metadata.typography.hideIcons">{t`Hide Icons`}</Label>
          </div>

          <div className="flex items-center gap-x-4 py-1">
            <Switch
              id="metadata.typography.underlineLinks"
              checked={typography.underlineLinks}
              onCheckedChange={(checked) => {
                setValue("metadata.typography.underlineLinks", checked);
              }}
            />
            <Label htmlFor="metadata.typography.underlineLinks">{t`Underline Links`}</Label>
          </div>
        </div>
      </main>
    </section>
  );
};
