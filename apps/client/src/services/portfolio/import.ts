import { ImportResumeDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const importPortfolio = async (data: ImportResumeDto) => {
  const response = await axios.post<ResumeDto, AxiosResponse<ResumeDto>, ImportResumeDto>(
    "/portfolio/import",
    data,
  );

  return response.data;
};

export const useImportPortfolio = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: importPortfolioFn,
  } = useMutation({
    mutationFn: importPortfolio,
    onSuccess: (data) => {
      queryClient.setQueryData<ResumeDto>(["portfolio", { id: data.id }], data);

      queryClient.setQueryData<ResumeDto[]>(["portfolios"], (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });

  return { importPortfolio: importPortfolioFn, loading, error };
};
