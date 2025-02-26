import type { CompanyDto, UpdateCompanyDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import debounce from "lodash.debounce";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updateCompany = async (data: UpdateCompanyDto) => {
  const response = await axios.patch<CompanyDto, AxiosResponse<CompanyDto>, UpdateCompanyDto>(
    `/company`,
    data,
  );

  queryClient.setQueryData<CompanyDto>(["company", { id: response.data.id }], response.data);

  queryClient.setQueryData<CompanyDto[]>(["companies"], (cache) => {
    if (!cache) return [response.data];
    return cache.map((company) => {
      if (company.id === response.data.id) return response.data;
      return company;
    });
  });

  return response.data;
};

export const debouncedUpdateCompany = debounce(updateCompany, 500);

export const useUpdateCompany = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateCompanyFn,
  } = useMutation({
    mutationFn: updateCompany,
  });

  return { updateCompany: updateCompanyFn, loading, error };
};
