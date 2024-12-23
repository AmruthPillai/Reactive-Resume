import { PortfolioDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

type LockPortfolioArgs = {
  id: string;
  set: boolean;
};

export const lockPortfolio = async ({ id, set }: LockPortfolioArgs) => {
  const response = await axios.patch(`/portfolio/${id}/lock`, { set });

  queryClient.setQueryData<PortfolioDto>(["portfolio", { id: response.data.id }], response.data);

  queryClient.setQueryData<PortfolioDto[]>(["portfolios"], (cache) => {
    if (!cache) return [response.data];
    return cache.map((portfolio) => {
      if (portfolio.id === response.data.id) return response.data;
      return portfolio;
    });
  });

  return response.data;
};

export const useLockPortfolio = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: lockPortfolioFn,
  } = useMutation({
    mutationFn: lockPortfolio,
  });

  return { lockPortfolio: lockPortfolioFn, loading, error };
};
