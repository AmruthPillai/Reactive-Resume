import { t } from "@lingui/macro";
import { useCallback, useEffect, useMemo, useState } from "react";
import { pdebug, pgroup, pgroupEnd, redactConfig } from "./payments-debug";

import { axios } from "@/client/libs/axios";
import { useUser } from "@/client/services/user/user";

type PaystackConfig = {
  publicKey: string;
  currency: string;
  channels: string[];
};

type PaystackResponse = {
  reference: string;
  id?: string;
};

type PaystackSetupOptions = {
  key: string;
  email: string;
  amount: number;
  currency: string;
  channels: string[];
  metadata: Record<string, unknown>;
  callback: (response: PaystackResponse) => void;
  onClose: () => void;
};

type PaystackHandler = {
  openIframe: () => void;
};

type PaystackPop = {
  setup: (options: PaystackSetupOptions) => PaystackHandler;
};

declare global {
  interface Window {
    PaystackPop?: PaystackPop;
  }
}

export const usePaystack = () => {
  const { user } = useUser();
  const [config, setConfig] = useState<PaystackConfig | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    pgroup("config:load");
    void (async () => {
      try {
        const { data } = await axios.get<PaystackConfig>("/paystack/config");
        setConfig(data);
        pdebug("config loaded", redactConfig(data));
      } catch {
        const message = t`Failed to load payment configuration`;
        setError(message);
        pdebug("config error", message);
      }
    })();
    pgroupEnd();
  }, []);

  useEffect(() => {
    pgroup("script:ensure-inlinejs");
    // Load InlineJS
    if (window.PaystackPop) {
      setReady(true);
      pdebug("script already present", typeof window.PaystackPop?.setup === "function");
      pgroupEnd();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.addEventListener("load", () => {
      setReady(true);
      pdebug("script loaded", typeof window.PaystackPop?.setup === "function");
    });
    script.addEventListener("error", () => {
      const message = t`Failed to load Paystack payment script`;
      setError(message);
      pdebug("script load error", message);
    });
    document.body.append(script);
    pgroupEnd();
    return () => {
      script.remove();
    };
  }, []);

  const skuPriceKES = useMemo(
    () => ({ templates10: 100, ai_addon: 500, lifetime: 1000 }) as const,
    [],
  );

  const pay = useCallback(
    (sku: keyof typeof skuPriceKES) => {
      pgroup("pay:click");
      pdebug("input", { sku });
      if (!user) {
        const error = t`Please log in to make a purchase`;
        pdebug("guard:user", false, error);
        pgroupEnd();
        return { error };
      }

      if (!config) {
        const error = t`Payment system not configured`;
        pdebug("guard:config", false, error);
        pgroupEnd();
        return { error };
      }

      if (!ready || !window.PaystackPop) {
        const error = t`Payment system is loading, please try again`;
        pdebug("guard:ready", { ready, hasPop: !!window.PaystackPop }, error);
        pgroupEnd();
        return { error };
      }

      const amountKES = skuPriceKES[sku];
      const hasSetup = typeof window.PaystackPop.setup === "function";
      pdebug("setup:pre", {
        hasSetup,
        opts: {
          key: "***",
          email: user.email,
          amount: amountKES * 100,
          currency: config.currency,
          channels: config.channels,
          metadata: { sku, userId: user.id },
        },
      });

      const onSuccess = (response: { reference: string }) => {
        pdebug("callback:success", { reference: response.reference });
        void axios
          .get(
            `/paystack/verify?reference=${encodeURIComponent(response.reference)}&userId=${encodeURIComponent(user.id)}&sku=${encodeURIComponent(sku)}&amountKES=${amountKES}`,
          )
          .then(() => {
            pdebug("verify:done -> reload");
            window.location.reload();
          })
          .catch(() => {
            pdebug("verify:error -> reload anyway");
            window.location.reload();
          });
      };

      const onClose = () => {
        pdebug("popup:closed");
      };

      let handler: PaystackHandler | null = null;
      try {
        handler = window.PaystackPop.setup({
          key: config.publicKey,
          email: user.email,
          amount: amountKES * 100,
          currency: config.currency,
          channels: config.channels,
          metadata: { sku, userId: user.id },
          callback: onSuccess,
          onClose,
        });
      } catch (error_) {
        const message = error_ instanceof Error ? error_.message : String(error_);
        pdebug("setup:error", message);
        setError(message);
        pgroupEnd();
        return { error: message };
      }

      const hasOpen = !!(handler && handler.openIframe);
      pdebug("setup:post", { handler: !!handler, hasOpen });
      try {
        handler.openIframe();
      } catch (error_) {
        const message = error_ instanceof Error ? error_.message : String(error_);
        pdebug("openIframe:error", message);
        setError(message);
        pgroupEnd();
        return { error: message };
      }

      pgroupEnd();
      return { error: null };
    },
    [config, ready, user, skuPriceKES],
  );

  return { ready: !!(ready && config), pay, config, error };
};
