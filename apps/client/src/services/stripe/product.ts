import { ProductDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const fetchProducts = async () => {
  const response = await axios.get<ProductDto[]>(`/stripe/products`);

  return response.data;
};

export const useProducts = () => {
  const {
    error,
    isPending: loading,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  return { products, loading, error };
};
