import { t } from "@lingui/macro";
import { Button } from "@reactive-resume/ui";
import { useNavigate } from "react-router";

import { toast } from "@/client/hooks/use-toast";
import { useUser } from "@/client/services/user/user";

import { pdebug } from "./payments-debug";
import { usePaystack } from "./use-paystack";

type Props = {
  sku: "templates10" | "ai_addon" | "lifetime";
  label: string;
};

export const CheckoutButton = ({ sku, label }: Props) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { ready, pay, error: hookError } = usePaystack();

  const onClick = () => {
    pdebug("button:click", { ready });
    if (!user) {
      void navigate("/auth/login");
      return;
    }
    // Allow checkout without requiring 2FA. Post-purchase, a non-blocking nudge appears in dashboard.
    const result = pay(sku);
    pdebug("button:result", result);
    if (result.error) {
      toast({
        variant: "error",
        title: t`Payment Error`,
        description: result.error,
      });
    }
  };

  const buttonLabel = ready ? label : t`Loading...`;
  const showError = !!hookError && !ready;

  return (
    <>
      <Button className="w-full" disabled={!ready} variant="primary" onClick={onClick}>
        {buttonLabel}
      </Button>
      {showError && <p className="mt-2 text-center text-xs text-error">{hookError}</p>}
    </>
  );
};
