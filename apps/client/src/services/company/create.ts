import type { CompanyDto } from "@reactive-resume/dto";
import type { CreateCompanyDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const createCompany = async (data: CreateCompanyDto) => {
  const response = await axios.post<CompanyDto, AxiosResponse<CompanyDto>, CreateCompanyDto>(
    "/company",
    data,
  );

  return response.data;
};

export const useCreateCompany = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createCompanyFn,
  } = useMutation({
    mutationFn: createCompany,
    onSuccess: (data) => {
      queryClient.setQueryData<CompanyDto>(["company", { id: data.id }], data);

      queryClient.setQueryData<CompanyDto[]>(["companies"], (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });

  return { createCompany: createCompanyFn, loading, error };
};
