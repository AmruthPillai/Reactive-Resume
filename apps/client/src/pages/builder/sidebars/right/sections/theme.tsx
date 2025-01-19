import { t } from "@lingui/macro";
import { Input, Label, Popover, PopoverContent, PopoverTrigger } from "@reactive-resume/ui";
import { cn } from "@reactive-resume/utils";
import { HexColorPicker } from "react-colorful";

import { colors } from "@/client/constants/colors";
import { useResumeStore } from "@/client/stores/resume";

import { SectionIcon } from "../shared/section-icon";

export const ThemeSection = () => {
  const setValue = useResumeStore((state) => state.setValue);
  const theme = useResumeStore((state) => state.resume.data.metadata.theme);

  return (
    <section id="theme" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <SectionIcon id="theme" size={18} name={t`Theme`} />
          <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Theme`}</h2>
        </div>
      </header>

      <main className="grid gap-y-6">
        <div className="mb-2 grid grid-cols-6 flex-wrap justify-items-center gap-y-4 @xs/right:grid-cols-9">
          {colors.map((color) => (
            <div
              key={color}
              className={cn(
                "flex size-6 cursor-pointer items-center justify-center rounded-full ring-primary ring-offset-1 ring-offset-background transition-shadow hover:ring-1",
                theme.primary === color && "ring-1",
              )}
              onClick={() => {
                setValue("metadata.theme.primary", color);
              }}
            >
              <div className="size-5 rounded-full" style={{ backgroundColor: color }} />
            </div>
          ))}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="theme.primary">{t`Primary Color`}</Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="absolute inset-y-0 left-3 my-2.5 size-4 cursor-pointer rounded-full ring-primary ring-offset-2 ring-offset-background transition-shadow hover:ring-1"
                  style={{ backgroundColor: theme.primary }}
                />
              </PopoverTrigger>
              <PopoverContent className="rounded-lg border-none bg-transparent p-0">
                <HexColorPicker
                  color={theme.primary}
                  onChange={(color) => {
                    setValue("metadata.theme.primary", color);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Input
              id="theme.primary"
              value={theme.primary}
              className="pl-10"
              onChange={(event) => {
                setValue("metadata.theme.primary", event.target.value);
              }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="theme.primary">{t`Background Color`}</Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="absolute inset-y-0 left-3 my-2.5 size-4 cursor-pointer rounded-full ring-primary ring-offset-2 ring-offset-background transition-shadow hover:ring-1"
                  style={{ backgroundColor: theme.background }}
                />
              </PopoverTrigger>
              <PopoverContent className="rounded-lg border-none bg-transparent p-0">
                <HexColorPicker
                  color={theme.background}
                  onChange={(color) => {
                    setValue("metadata.theme.background", color);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Input
              id="theme.background"
              value={theme.background}
              className="pl-10"
              onChange={(event) => {
                setValue("metadata.theme.background", event.target.value);
              }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="theme.primary">{t`Text Color`}</Label>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className="absolute inset-y-0 left-3 my-2.5 size-4 cursor-pointer rounded-full ring-primary ring-offset-2 ring-offset-background transition-shadow hover:ring-1"
                  style={{ backgroundColor: theme.text }}
                />
              </PopoverTrigger>
              <PopoverContent className="rounded-lg border-none bg-transparent p-0">
                <HexColorPicker
                  color={theme.text}
                  onChange={(color) => {
                    setValue("metadata.theme.text", color);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Input
              id="theme.text"
              value={theme.text}
              className="pl-10"
              onChange={(event) => {
                setValue("metadata.theme.text", event.target.value);
              }}
            />
          </div>
        </div>
      </main>
    </section>
  );
};
