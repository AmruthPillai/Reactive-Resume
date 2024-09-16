/* eslint-disable lingui/no-unlocalized-strings */
import { Spinner } from "@phosphor-icons/react";
import { SubscriptionDto } from "@reactive-resume/dto";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";

async function tryUpsertSubscription(data: {
  customerId: string | null;
  externalIdentifier: string | null;
  documentNumber: string | null;
  paymentId: string | null;
}) {
  const request = {
    userId: data.externalIdentifier,
    extCustomerId: data.customerId,
    extPaymentId: data.paymentId,
  };

  const response = await axios.post<SubscriptionDto, AxiosResponse<SubscriptionDto>>(
    "/billing/subscribe",
    request,
  );

  return response.data;
}

export const PaymentPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get("OG-CustomerID");
    const externalIdentifier = params.get("OG-ExternalIdentifier");
    const documentNumber = params.get("OG-DocumentNumber");
    const paymentId = params.get("OG-PaymentId");

    void tryUpsertSubscription({ customerId, externalIdentifier, documentNumber, paymentId }).then(
      () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Your subscription has been successfully created.",
        });

        navigate("/dashboard/billing", { replace: true });
      },
    );
  }, []);

  // eslint-disable-next-line tailwindcss/no-custom-classname
  return <Spinner className="text-primary-500 size-8 animate-spin" />;
};
