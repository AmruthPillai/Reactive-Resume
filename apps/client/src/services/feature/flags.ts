import type { FeatureDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const fetchFeatureFlags = async () => {
  const response = await axios.get<FeatureDto>(`/feature/flags`);

  return response.data;
};

export const useFeatureFlags = () => {
  const {
    error,
    isPending: loading,
    data: flags,
  } = useQuery({
    queryKey: ["feature_flags"],
    queryFn: () => fetchFeatureFlags(),
    refetchOnMount: "always",
    initialData: {
      isSignupsDisabled: false,
      isEmailAuthDisabled: false,
    },
  });

  return { flags, loading, error };
};
