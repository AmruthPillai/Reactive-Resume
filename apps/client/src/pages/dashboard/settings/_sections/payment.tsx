import { t } from "@lingui/macro";

import { useUser } from "@/client/services/user";

export const PaymentSettings = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold leading-relaxed tracking-tight">{t`Payment`}</h3>
        <p className="leading-relaxed opacity-75">
          {t`Here, you can update your payment information such as your subscriptions.`}
        </p>
      </div>
    </div>
  );
};
