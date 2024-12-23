import { CreatePortfolioDto, PortfolioDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const createPortfolio = async (data: CreatePortfolioDto) => {
  const response = await axios.post<PortfolioDto, AxiosResponse<PortfolioDto>, CreatePortfolioDto>(
    "/portfolio",
    data,
  );

  return response.data;
};

export const useCreatePortfolio = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createPortfolioFn,
  } = useMutation({
    mutationFn: createPortfolio,
    onSuccess: (data) => {
      queryClient.setQueryData<PortfolioDto>(["portfolio", { id: data.id }], data);

      queryClient.setQueryData<PortfolioDto[]>(["portfolios"], (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });

  return { createPortfolio: createPortfolioFn, loading, error };
};
