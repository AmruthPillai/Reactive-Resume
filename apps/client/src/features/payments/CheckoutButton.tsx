import { Button } from "@reactive-resume/ui";
import { useNavigate } from "react-router";

import { useUser } from "@/client/services/user/user";
import { useToast } from "@/client/hooks/use-toast";

import { usePaystack } from "./usePaystack";

type Props = {
  sku: "templates10" | "ai_addon" | "lifetime";
  label: string;
};

export const CheckoutButton = ({ sku, label }: Props) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { ready, pay } = usePaystack();
  const { toast } = useToast();

  const onClick = () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    if ((sku === "lifetime" || sku === "ai_addon") && !user.twoFactorEnabled) {
      toast({
        variant: "error",
        title: "Enable 2FA to continue",
        description: "For security, please enable Two‑Factor Authentication in Settings before purchasing.",
      });
      navigate("/dashboard/settings");
      return;
    }
    void pay(sku);
  };

  return (
    <Button disabled={!ready} onClick={onClick} variant="primary" className="w-full">
      {label}
    </Button>
  );
};
