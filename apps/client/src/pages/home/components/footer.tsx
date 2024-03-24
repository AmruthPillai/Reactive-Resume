import { t } from "@lingui/macro";
import { Separator } from "@reactive-resume/ui";

import { Copyright } from "@/client/components/copyright";
import { LocaleSwitch } from "@/client/components/locale-switch";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";

export const Footer = () => (
  <footer className="bg-background">
    <Separator />

    <div className="container grid py-12 sm:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col gap-y-2">
        <Logo size={96} className="-ml-2" />

        <h2 className="text-xl font-medium">{t`Reactive Resume`}</h2>

        <p className="prose prose-sm prose-zinc leading-relaxed opacity-60 dark:prose-invert">
          {t`Elevate Your Professional Story: Craft a Dynamic, AI-Powered Live Resume with Our Innovative Resume Builder.`}
        </p>

        <Copyright className="mt-6" />
      </div>

      <div className="relative col-start-4 flex flex-col items-end justify-end">
        <div className="mb-14">
          <a href="https://www.digitalocean.com/?utm_medium=opensource&utm_source=Reactive-Resume">
            <img
              src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/PoweredByDO/DO_Powered_by_Badge_black.svg"
              alt="Powered by DigitalOcean"
              className="block dark:hidden"
              width="150px"
            />
            <img
              src="https://opensource.nyc3.cdn.digitaloceanspaces.com/attribution/assets/PoweredByDO/DO_Powered_by_Badge_white.svg"
              alt="Powered by DigitalOcean"
              className="hidden dark:block"
              width="150px"
            />
          </a>
        </div>

        <div className="absolute bottom-0 right-0 lg:space-x-2">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  </footer>
);
