import { t } from "@lingui/macro";
import { Button, Separator } from "@reactive-resume/ui";
import dayjs from "dayjs";

import { CheckoutButton } from "@/client/features/payments/CheckoutButton";
import { useBilling } from "@/client/services/account/account";

export const BillingSettings = () => {
  const { data, isPending } = useBilling();
  const ent = data?.entitlements;
  const rows = data?.payments ?? [];

  return (
    <section id="billing" className="grid gap-y-6">
      <header className="flex items-center justify-between">
        <h2 className="line-clamp-1 text-2xl font-bold lg:text-3xl">{t`Billing`}</h2>
      </header>

      {/* Current Plan */}
      <div className="rounded border p-4">
        <h3 className="mb-2 text-lg font-semibold">{t`Current Plan`}</h3>
        {isPending ? (
          <div className="text-sm text-muted-foreground">{t`Loading...`}</div>
        ) : (
          <div className="flex flex-wrap gap-8">
            <div>
              <div className="text-xs text-muted-foreground">{t`Plan`}</div>
              <div className="text-xl font-bold">{ent?.plan}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{t`Templates`}</div>
              <div className="text-xl font-bold">{ent?.templatesCap}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{t`AI`}</div>
              <div className="text-xl font-bold">{ent?.hasAI ? t`Enabled` : t`Locked`}</div>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Options */}
      <div className="rounded border p-4">
        <h3 className="mb-2 text-lg font-semibold">{t`Upgrade Options`}</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {t`Upgrade your experience — affordable, one-time plans for Kenyan job seekers.`}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <CheckoutButton sku="templates10" label={t`10 Templates — KES 100`} />
          <CheckoutButton sku="ai_addon" label={t`AI Add-on — KES 500`} />
          <CheckoutButton sku="lifetime" label={t`Lifetime — KES 1,000`} />
        </div>
        <Separator className="my-4" />
        <div className="text-xs text-muted-foreground">
          {t`Powered by Paystack (M-PESA, Card, Apple Pay). Secure payment processing.`}
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded border p-4">
        <h3 className="mb-2 text-lg font-semibold">{t`Payment History`}</h3>
        {rows.length === 0 ? (
          <div className="text-sm text-muted-foreground">{t`No payments yet.`}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2">{t`Date`}</th>
                  <th className="py-2">{t`SKU`}</th>
                  <th className="py-2">{t`Amount`}</th>
                  <th className="py-2">{t`Status`}</th>
                  <th className="py-2">{t`Reference`}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} className="border-b">
                    <td className="py-2">{dayjs(p.createdAt).format("YYYY-MM-DD HH:mm")}</td>
                    <td className="py-2">{p.sku}</td>
                    <td className="py-2">
                      {p.currency} {p.amountKES}
                    </td>
                    <td className="py-2">{p.status}</td>
                    <td className="py-2 font-mono text-xs">{p.reference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Support */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>{t`Need help with a payment?`}</span>
        <Button asChild size="sm" variant="outline">
          <a href="mailto:support@cvkenya.co">{t`Contact Support`}</a>
        </Button>
      </div>
    </section>
  );
};

