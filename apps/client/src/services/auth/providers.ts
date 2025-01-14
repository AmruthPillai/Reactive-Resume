import type { AuthProvidersDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { AUTH_PROVIDERS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const getAuthProviders = async () => {
  const response = await axios.get<AuthProvidersDto>(`/auth/providers`);

  return response.data;
};

export const useAuthProviders = () => {
  const {
    error,
    isPending: loading,
    data: providers,
  } = useQuery({
    queryKey: [AUTH_PROVIDERS_KEY],
    queryFn: getAuthProviders,
  });

  return { providers, loading, error };
};
