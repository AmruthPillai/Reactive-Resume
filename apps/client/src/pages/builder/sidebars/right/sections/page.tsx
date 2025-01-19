import { t } from "@lingui/macro";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
} from "@reactive-resume/ui";

import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

export const PageSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const page = useResumeStore((state) => state.resume.data.metadata.page);

  return (
    <section id="page" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="page" size={18} name={t`Page`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Page`}</h2>
        </div>
      </header>

      <main className="grid gap-y-6">
        <div className="space-y-1.5">
          <Label>{t`Format`}</Label>
          <Select
            value={page.format}
            onValueChange={(value) => {
              setValue("metadata.page.format", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={t`Format`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a4">{t`A4`}</SelectItem>
              <SelectItem value="letter">{t`Letter`}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>{t`Margin`}</Label>
          <div className="flex items-center gap-x-4 py-1">
            <Slider
              min={0}
              max={48}
              step={2}
              value={[page.margin]}
              onValueChange={(value) => {
                setValue("metadata.page.margin", value[0]);
              }}
            />

            <span className="text-base font-bold">{page.margin}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>{t`Options`}</Label>

          <div className="py-2">
            <div className="flex items-center gap-x-4">
              <Switch
                id="metadata.page.options.breakLine"
                checked={page.options.breakLine}
                onCheckedChange={(checked) => {
                  setValue("metadata.page.options.breakLine", checked);
                }}
              />
              <Label htmlFor="metadata.page.options.breakLine">{t`Show Break Line`}</Label>
            </div>
          </div>

          <div className="py-2">
            <div className="flex items-center gap-x-4">
              <Switch
                id="metadata.page.options.pageNumbers"
                checked={page.options.pageNumbers}
                onCheckedChange={(checked) => {
                  setValue("metadata.page.options.pageNumbers", checked);
                }}
              />
              <Label htmlFor="metadata.page.options.pageNumbers">{t`Show Page Numbers`}</Label>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};
