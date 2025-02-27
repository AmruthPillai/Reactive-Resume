import type { CompanyDto, DeleteDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const deleteCompany = async (data: DeleteDto) => {
  const response = await axios.delete<CompanyDto, AxiosResponse<CompanyDto>, DeleteDto>(
    `/company/${data.id}`,
  );

  return response.data;
};

export const useDeleteCompany = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deleteCompanyFn,
  } = useMutation({
    mutationFn: deleteCompany,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["company", data.id] });

      queryClient.setQueryData<CompanyDto[]>(["companies"], (cache) => {
        if (!cache) return [];
        return cache.filter((company) => company.id !== data.id);
      });
    },
  });

  return { deleteCompany: deleteCompanyFn, loading, error };
};
