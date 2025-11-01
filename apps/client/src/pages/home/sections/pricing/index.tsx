import { t } from "@lingui/macro";
import { Badge } from "@reactive-resume/ui";
import { CheckoutButton } from "@/client/features/payments/checkout-button";
import { CheckIcon } from "@phosphor-icons/react";

export const PricingSection = () => (
  <section id="pricing" className="relative py-24 sm:py-32 lg:py-40 bg-background">
    <div className="container px-4 sm:px-6 lg:px-8">
      {/* Section Header - Centered */}
      <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
          {t`Simple, affordable pricing`}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
          {t`Start free. Upgrade with M-PESA or card anytime. One-time payment, no subscriptions.`}
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Free Plan */}
        <div className="relative rounded-2xl border-2 border-border/50 bg-background p-8 flex flex-col">
          <div className="mb-6 text-center">
            <h3 className="text-xl font-bold mb-2">{t`Free`}</h3>
            <div className="mb-1">
              <span className="text-5xl font-bold">0</span>
            </div>
            <p className="text-sm text-muted-foreground">{t`KES • Forever`}</p>
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
            <p className="text-sm text-muted-foreground">{t`KES • One-time`}</p>
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
            <p className="text-sm text-muted-foreground">{t`KES • One-time`}</p>
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
            <p className="text-sm text-muted-foreground">{t`KES • One-time`}</p>
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
    </div>
  </section>
);
