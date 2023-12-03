import { StripeCheckoutRequest, StripeCheckoutResponse } from "@reactive-resume/schema";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const createCheckoutSession = async (checkoutRequest: StripeCheckoutRequest) => {
  const response = await axios.post<
    StripeCheckoutResponse,
    AxiosResponse<StripeCheckoutResponse>,
    StripeCheckoutRequest
  >(`/stripe/create-checkout-session`, checkoutRequest);

  return response.data;
};

export const useCheckoutSession = (checkoutRequest: StripeCheckoutRequest) => {
  const {
    error,
    isPending: loading,
    data: checkoutSession,
  } = useQuery({
    queryKey: ["create-checkout-session", checkoutRequest],
    queryFn: () => createCheckoutSession(checkoutRequest),
  });

  return { checkoutSession, loading, error };
};
