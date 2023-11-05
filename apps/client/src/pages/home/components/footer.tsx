import { Separator } from "@reactive-resume/ui";

import { Copyright } from "@/client/components/copyright";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";

export const Footer = () => (
  <footer className="fixed inset-x-0 bottom-0 -z-50 h-[400px] bg-background">
    <Separator />

    <div className="container grid py-6 sm:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col gap-y-2">
        <Logo size={96} className="-ml-2" />

        <h2 className="text-xl font-medium">Reactive Resume</h2>

        <p className="prose prose-sm prose-zinc leading-relaxed opacity-60 dark:prose-invert">
          A free and open-source resume builder that simplifies the tasks of creating, updating, and
          sharing your resume.
        </p>

        <Copyright className="mt-6" />
      </div>

      <div className="relative col-start-4">
        <div className="absolute bottom-0 right-0">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  </footer>
);
