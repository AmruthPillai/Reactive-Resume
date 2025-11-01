import { t } from "@lingui/macro";
import { CheckIcon } from "@phosphor-icons/react";
import { Badge } from "@reactive-resume/ui";
import { Helmet } from "react-helmet-async";

import { CheckoutButton } from "./checkout-button";

export const PricingPage = () => (
  <>
    <Helmet>
      <title>
        {t`Pricing`} - {t`CV Builder`}
      </title>
    </Helmet>

    {/* Add top padding to account for fixed header */}
    <main className="min-h-screen bg-background pt-24">
      <div className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            {t`Simple, affordable pricing`}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            {t`Start free. Upgrade with M-PESA or card anytime. One-time payment, no subscriptions.`}
          </p>
        </div>

        {/* Pricing Grid - Reusing the same design from homepage */}
        <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Free Plan */}
          <div className="relative rounded-2xl border-2 border-border/50 bg-background p-8 flex flex-col">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold mb-2">{t`Free`}</h3>
              <div className="mb-1">
                <span className="text-5xl font-bold">0</span>
              </div>
              <p className="text-sm text-muted-foreground">{t`KES  Forever`}</p>
            </div>
            <ul className="mb-8 space-y-3 flex-1">
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`3 basic templates`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`PDF export`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`Public share link`}</span>
              </li>
            </ul>
            <a
              href="/auth/register"
              className="w-full inline-flex items-center justify-center rounded-lg border-2 border-info bg-info text-info-foreground px-6 py-3 text-sm font-semibold transition-all hover:bg-info-accent"
            >
              {t`Start Free`}
            </a>
          </div>

          {/* Templates Pack */}
          <div className="relative rounded-2xl border-2 border-border/50 bg-background p-8 flex flex-col">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold mb-2">{t`Templates`}</h3>
              <div className="mb-1">
                <span className="text-5xl font-bold">100</span>
              </div>
              <p className="text-sm text-muted-foreground">{t`KES  One-time`}</p>
            </div>
            <ul className="mb-8 space-y-3 flex-1">
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`Everything in Free`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`10 premium templates`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`Advanced customization`}</span>
              </li>
            </ul>
            <CheckoutButton sku="templates10" label={t`Get Templates`} />
          </div>

          {/* AI Add-on - Featured */}
          <div className="relative rounded-2xl border-2 border-info bg-background p-8 flex flex-col shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-info text-info-foreground px-4 py-1 font-semibold">{t`Popular`}</Badge>
            </div>
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold mb-2">{t`AI Power`}</h3>
              <div className="mb-1">
                <span className="text-5xl font-bold">500</span>
              </div>
              <p className="text-sm text-muted-foreground">{t`KES  One-time`}</p>
            </div>
            <ul className="mb-8 space-y-3 flex-1">
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{t`Everything in Templates`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{t`10 premium templates`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{t`AI writing assistant`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{t`Grammar & tone fixes`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm font-medium">{t`Content suggestions`}</span>
              </li>
            </ul>
            <CheckoutButton sku="ai_addon" label={t`Get AI Access`} />
          </div>

          {/* Lifetime Plan */}
          <div className="relative rounded-2xl border-2 border-border/50 bg-background p-8 flex flex-col">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-bold mb-2">{t`Lifetime`}</h3>
              <div className="mb-1">
                <span className="text-5xl font-bold">1,000</span>
              </div>
              <p className="text-sm text-muted-foreground">{t`KES  One-time`}</p>
            </div>
            <ul className="mb-8 space-y-3 flex-1">
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`All 13 templates`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`AI forever`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`All future updates`}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon size={20} weight="bold" className="text-info shrink-0 mt-0.5" />
                <span className="text-sm">{t`Priority support`}</span>
              </li>
            </ul>
            <CheckoutButton sku="lifetime" label={t`Get Lifetime Access`} />
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mx-auto max-w-3xl mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">{t`Frequently Asked Questions`}</h2>
          <div className="space-y-4 text-left">
            <div className="rounded-lg border border-border/50 p-6">
              <h3 className="font-semibold mb-2">{t`How do I pay?`}</h3>
              <p className="text-sm text-muted-foreground">
                {t`We accept M-PESA and card payments via Paystack. All payments are secure and one-time only.`}
              </p>
            </div>
            <div className="rounded-lg border border-border/50 p-6">
              <h3 className="font-semibold mb-2">{t`Can I upgrade later?`}</h3>
              <p className="text-sm text-muted-foreground">
                {t`Yes! You can upgrade from Free to any paid plan at any time. Your previous features remain active.`}
              </p>
            </div>
            <div className="rounded-lg border border-border/50 p-6">
              <h3 className="font-semibold mb-2">{t`What if I'm not satisfied?`}</h3>
              <p className="text-sm text-muted-foreground">
                {t`Contact our support team within 7 days for a full refund, no questions asked.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
);

