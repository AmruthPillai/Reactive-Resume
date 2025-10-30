import { t } from "@lingui/macro";
import { Card, CardContent, CardHeader, CardTitle } from "@reactive-resume/ui";
import { Helmet } from "react-helmet-async";

import { CheckoutButton } from "./CheckoutButton";

export const PricingPage = () => (
  <>
    <Helmet>
      <title>
        {t`Pricing`} - {t`Reactive Resume`}
      </title>
    </Helmet>
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <h1 className="text-center text-4xl font-bold">{t`Pricing`}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t`Templates Pack`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-2xl font-bold">KES 100</p>
            <ul className="mb-6 list-disc pl-5 text-sm">
              <li>{t`Unlock 10 premium templates`}</li>
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
              <li>{t`Enable AI improve, grammar & tone`}</li>
            </ul>
            <CheckoutButton sku="ai_addon" label={t`Unlock AI`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t`Lifetime`}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-2xl font-bold">KES 1,000</p>
            <ul className="mb-6 list-disc pl-5 text-sm">
              <li>{t`All templates, AI forever`}</li>
            </ul>
            <CheckoutButton sku="lifetime" label={t`Go Lifetime`} />
          </CardContent>
        </Card>
      </div>
    </div>
  </>
);

