import { t, Trans } from "@lingui/macro";
import { Separator } from "@reactive-resume/ui";
import { Link } from "react-router";

import { Copyright } from "@/client/components/copyright";
import { LocaleSwitch } from "@/client/components/locale-switch";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";

export const Footer = () => (
  <footer className="bg-background">
    <Separator />

    {/* CTA Banner */}
    <div className="container py-8">
      <div className="rounded-lg bg-secondary-accent px-6 py-8 text-center">
        <h3 className="text-2xl font-semibold">{t`Start building your professional CV today — it’s free.`}</h3>
        <div className="mt-4">
          <Link to="/auth/register" className="inline-block rounded-md bg-primary px-5 py-2 text-background">
            {t`Start Free`}
          </Link>
        </div>
      </div>
    </div>

    <div id="contact" className="container grid py-12 sm:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col gap-y-2">
        <Logo size={96} className="-ml-2" />

        <h2 className="text-xl font-medium">{t`CV Builder`}</h2>

        <p className="prose prose-sm prose-zinc leading-relaxed opacity-60 dark:prose-invert">
          {t`Create professional, ATS-friendly CVs tailored for Kenya. Pay with M-PESA or card, and use AI to improve your writing.`}
        </p>

        <Copyright className="mt-6" />
      </div>

      <div className="relative col-start-4 flex flex-col items-end justify-end">
        <div className="mb-14 space-y-2 text-right">
          <div className="text-sm opacity-80">{t`Built in Kenya • Powered by Paystack and OpenAI`}</div>
          <Link to="/pricing" className="block text-sm font-medium">{t`Pricing`}</Link>
          <a href="#faq" className="block text-sm font-medium">{t`FAQ`}</a>
          <Link to="/meta/privacy-policy" className="block text-sm font-medium">{t`Privacy Policy`}</Link>
        </div>

        <div className="absolute bottom-0 right-0 lg:space-x-2">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  </footer>
);
