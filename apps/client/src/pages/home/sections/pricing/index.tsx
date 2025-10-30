import { t } from "@lingui/macro";
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@reactive-resume/ui";
import { CheckoutButton } from "@/client/features/payments/CheckoutButton";

export const PricingSection = () => (
  <section id="pricing" className="relative py-24 sm:py-32 bg-background">
    <div className="mx-auto max-w-5xl space-y-8 px-6">
      <div className="space-y-2 text-center">
        <h2 className="text-4xl font-bold">{t`Simple, affordable pricing`}</h2>
        <p className="opacity-80">{t`Start free. Upgrade with M-PESA or card anytime.`}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>{t`Free`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-2xl font-bold">KES 0</p>
            <ul className="mb-6 list-disc pl-5 text-sm">
              <li>{t`3 templates, basic features`}</li>
            </ul>
            <a href="/auth/register" className="inline-block rounded-md bg-primary px-4 py-2 text-background">
              {t`Start Free`}
            </a>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t`Templates Pack`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-2xl font-bold">KES 100</p>
            <ul className="mb-6 list-disc pl-5 text-sm">
              <li>{t`Everything in Free`}</li>
              <li>{t`+ 10 premium templates`}</li>
            </ul>
            <CheckoutButton sku="templates10" label={t`Unlock Templates`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t`AI Add-on`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-2xl font-bold">KES 500</p>
            <ul className="mb-6 list-disc pl-5 text-sm">
              <li>{t`Everything in Free`}</li>
              <li>{t`+ AI writing suite (improve, grammar & tone)`}</li>
            </ul>
            <CheckoutButton sku="ai_addon" label={t`Unlock AI`} />
          </CardContent>
        </Card>
        <Card className="relative">
          <div className="absolute right-3 top-3"><Badge>{t`Best Value`}</Badge></div>
          <CardHeader>
            <CardTitle>{t`Lifetime`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-2xl font-bold">KES 1,000</p>
            <ul className="mb-6 list-disc pl-5 text-sm">
              <li>{t`Everything in Templates Pack`}</li>
              <li>{t`+ AI forever`}</li>
            </ul>
            <CheckoutButton sku="lifetime" label={t`Go Lifetime`} />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 text-center text-sm opacity-80">
        <span>{t`Powered by Paystack`}</span>
        <span className="mx-2">•</span>
        <span>{t`AI by OpenAI`}</span>
      </div>
    </div>
  </section>
);
