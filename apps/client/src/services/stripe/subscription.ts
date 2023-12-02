import { ProductDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const fetchSubscriptions = async () => {
  const response = await axios.get<ProductDto[]>(`/stripe/products`);

  return response.data;
};

export const useSubscriptions = () => {
  const {
    error,
    isPending: loading,
    data: subscriptions,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchSubscriptions,
  });

  return { subscriptions, loading, error };
};
