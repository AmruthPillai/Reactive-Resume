import { useCallback, useEffect, useMemo, useState } from "react";

import { axios } from "@/client/libs/axios";
import { useUser } from "@/client/services/user/user";

type PaystackConfig = {
  publicKey: string;
  currency: string;
  channels: string[];
};

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

export const usePaystack = () => {
  const { user } = useUser();
  const [config, setConfig] = useState<PaystackConfig | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<PaystackConfig>("/paystack/config");
      setConfig(data);
    })();
  }, []);

  useEffect(() => {
    // Load InlineJS
    if (window.PaystackPop) {
      setReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setReady(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const skuPriceKES = useMemo(
    () => ({ templates10: 100, ai_addon: 500, lifetime: 1000 } as const),
    [],
  );

  const pay = useCallback(
    async (sku: keyof typeof skuPriceKES) => {
      if (!config || !ready || !window.PaystackPop || !user) return;
      const amountKES = skuPriceKES[sku];
      const handler = window.PaystackPop.setup({
        key: config.publicKey,
        email: user.email,
        amount: amountKES * 100,
        currency: config.currency,
        channels: config.channels,
        metadata: { sku, userId: user.id },
        callback: async (resp: any) => {
          try {
            await axios.get(
              `/paystack/verify?reference=${encodeURIComponent(resp.reference)}&userId=${encodeURIComponent(user.id)}&sku=${encodeURIComponent(sku)}&amountKES=${amountKES}`,
            );
            // Simple reload to reflect entitlements
            window.location.reload();
          } catch {
            // ignore; webhook should fulfill eventually
          }
        },
        onClose: () => void 0,
      });
      handler.openIframe();
    },
    [config, ready, user, skuPriceKES],
  );

  return { ready: !!(ready && config), pay, config };
};

