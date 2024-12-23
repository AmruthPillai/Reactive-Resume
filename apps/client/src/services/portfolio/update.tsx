import { PortfolioDto, UpdatePortfolioDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import debounce from "lodash.debounce";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updatePortfolio = async (data: UpdatePortfolioDto) => {
  const response = await axios.patch<PortfolioDto, AxiosResponse<PortfolioDto>, UpdatePortfolioDto>(
    `/portfolio/${data.id}`,
    data,
  );

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

export const debouncedUpdatePortfolio = debounce(updatePortfolio, 500);

export const useUpdatePortfolio = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updatePortfolioFn,
  } = useMutation({
    mutationFn: updatePortfolio,
  });

  return { updatePortfolio: updatePortfolioFn, loading, error };
};
