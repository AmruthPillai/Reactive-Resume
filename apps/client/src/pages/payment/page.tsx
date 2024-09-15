/* eslint-disable lingui/no-unlocalized-strings */
import { Spinner } from "@phosphor-icons/react";
import { SubscriptionDto } from "@reactive-resume/dto";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

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

  console.log(response.data);
  return response.data;
}

export const PaymentPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const customerId = params.get("OG-CustomerID");
    const externalIdentifier = params.get("OG-ExternalIdentifier");
    const documentNumber = params.get("OG-DocumentNumber");
    const paymentId = params.get("OG-PaymentId");

    void tryUpsertSubscription({ customerId, externalIdentifier, documentNumber, paymentId });
  }, []);

  return <Spinner className="text-primary-500 size-8 animate-spin" />;
};
