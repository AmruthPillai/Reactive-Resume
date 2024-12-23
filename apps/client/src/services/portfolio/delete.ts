import { DeletePortfolioDto, PortfolioDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const deletePortfolio = async (data: DeletePortfolioDto) => {
  const response = await axios.delete<PortfolioDto, AxiosResponse<PortfolioDto>, DeletePortfolioDto>(
    `/portfolio/${data.id}`,
  );

  return response.data;
};

export const useDeletePortfolio = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deletePortfolioFn,
  } = useMutation({
    mutationFn: deletePortfolio,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["portfolio", data.id] });

      queryClient.setQueryData<PortfolioDto[]>(["portfolios"], (cache) => {
        if (!cache) return [];
        return cache.filter((portfolio) => portfolio.id !== data.id);
      });
    },
  });

  return { deletePortfolio: deletePortfolioFn, loading, error };
};
