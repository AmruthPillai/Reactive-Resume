import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export type Entitlements = {
  plan: "free" | "lifetime" | string;
  hasAI: boolean;
  templatesCap: number;
};

export type PaymentRow = {
  id: string;
  reference: string;
  sku: string;
  amountKES: number;
  currency: string;
  status: string;
  createdAt: string | Date;
};

export const fetchEntitlements = async () => {
  const { data } = await axios.get<Entitlements>("/account/entitlements");
  return data;
};

export const fetchBilling = async () => {
  const { data } = await axios.get<{ entitlements: Entitlements; payments: PaymentRow[] }>(
    "/account/billing",
  );
  return data;
};

export const useEntitlements = () =>
  useQuery({ queryKey: ["account", "entitlements"], queryFn: fetchEntitlements });

export const useBilling = () =>
  useQuery({ queryKey: ["account", "billing"], queryFn: fetchBilling });

