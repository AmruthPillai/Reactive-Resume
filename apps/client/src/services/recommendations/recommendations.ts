import { JobTitleRecommendationsDto } from "@reactive-resume/dto";
import { PromptKey } from "@reactive-resume/schema";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const fetchRecommendations = async (jobTitle: string, type: PromptKey) => {
  const response = await axios.get<JobTitleRecommendationsDto>(
    `/recommendations/${jobTitle}/${type}`,
  );
  return response.data;
};

export const useRecommendations = (jobTitle: string, type: PromptKey) => {
  const {
    error,
    isLoading: loading,
    data: recommendations,
  } = useQuery({
    queryKey: ["recommendations", jobTitle, type],
    queryFn: () => fetchRecommendations(jobTitle, type),
    enabled: !!jobTitle,
  });
  return { recommendations, loading, error };
};
