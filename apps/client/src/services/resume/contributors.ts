import type { ContributorDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const fetchGitHubContributors = async () => {
  const response = await axios.get<ContributorDto[]>(`/contributors/github`);

  return response.data;
};

export const fetchCrowdinContributors = async () => {
  const response = await axios.get<ContributorDto[]>(`/contributors/crowdin`);

  return response.data;
};

export const useContributors = () => {
  const {
    error: githubError,
    isPending: githubLoading,
    data: github,
  } = useQuery({
    queryKey: ["contributors", "github"],
    queryFn: fetchGitHubContributors,
  });

  const {
    error: crowdinError,
    isPending: crowdinLoading,
    data: crowdin,
  } = useQuery({
    queryKey: ["contributors", "crowdin"],
    queryFn: fetchCrowdinContributors,
  });

  const error = githubError ?? crowdinError;
  const loading = githubLoading || crowdinLoading;

  return { github, crowdin, loading, error };
};
