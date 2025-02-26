import type { CompanyDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { COMPANIES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchCompanies = async () => {
  const response = await axios.get<CompanyDto[], AxiosResponse<CompanyDto[]>>("/company");
  return response.data;
};

export const useCompanies = () => {
  const {
    error,
    isPending: loading,
    data: companies,
  } = useQuery({
    queryKey: COMPANIES_KEY,
    queryFn: fetchCompanies,
  });

  return { companies, loading, error };
};

export const setDefault = async (data: { companyId: string; userId: string }) => {
  const response = await axios.patch(`/company/${data.companyId}/setDefault`, {
    userId: data.userId,
  });
  return response.data;
};
