import { t } from "@lingui/macro";
import { Button, Separator } from "@reactive-resume/ui";
import { Link } from "react-router";
import dayjs from "dayjs";
import { CheckIcon } from "@phosphor-icons/react";

import { CheckoutButton } from "@/client/features/payments/checkout-button";
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

      {/* Upgrade Options (aligned with homepage #pricing) */}
      <div className="rounded border p-4">
        <h3 className="mb-2 text-lg font-semibold">{t`Upgrade Options`}</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          {t`One-time upgrades. No subscriptions. Same options as on the homepage.`}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Templates */}
          <div className="rounded-lg border p-4 flex flex-col">
            <div className="mb-2">
              <div className="text-base font-semibold">{t`Templates`}</div>
              <div className="text-xs text-muted-foreground">{t`KES 100 · One-time`}</div>
            </div>
            <ul className="mb-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span>{t`Everything in Free`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span>{t`10 premium templates`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span>{t`Advanced customization`}</span>
              </li>
            </ul>
            <CheckoutButton sku="templates10" label={t`Get Templates`} />
          </div>

          {/* AI Power */}
          <div className="rounded-lg border p-4 flex flex-col">
            <div className="mb-2">
              <div className="text-base font-semibold">{t`AI Power`}</div>
              <div className="text-xs text-muted-foreground">{t`KES 500 · One-time`}</div>
            </div>
            <ul className="mb-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span className="font-medium">{t`Everything in Templates`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span className="font-medium">{t`10 premium templates`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span className="font-medium">{t`AI writing assistant`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span className="font-medium">{t`Grammar & tone fixes`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span className="font-medium">{t`Content suggestions`}</span>
              </li>
            </ul>
            <CheckoutButton sku="ai_addon" label={t`Get AI Access`} />
          </div>

          {/* Lifetime */}
          <div className="rounded-lg border p-4 flex flex-col">
            <div className="mb-2">
              <div className="text-base font-semibold">{t`Lifetime`}</div>
              <div className="text-xs text-muted-foreground">{t`KES 1,000 · One-time`}</div>
            </div>
            <ul className="mb-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span>{t`All 13 templates`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span>{t`AI forever`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span>{t`All future updates`}</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} weight="bold" className="text-info mt-0.5" />
                <span>{t`Priority support`}</span>
              </li>
            </ul>
            <CheckoutButton sku="lifetime" label={t`Get Lifetime Access`} />
          </div>
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
          <Link to="/contact">{t`Contact Support`}</Link>
        </Button>
      </div>
    </section>
  );
};
