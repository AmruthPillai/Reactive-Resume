import { ResumeDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { RESUME_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";
import { useResumeStore } from "@/client/stores/resume";

export const findResumeById = async (data: { id: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/${data.id}`);

  return response.data;
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};

export const useResume = (id: string) => {
  const {
    error,
    isPending: loading,
    data: resume,
  } = useQuery({
    queryKey: [RESUME_KEY, { id }],
    queryFn: () => findResumeById({ id }),
  });

  useResumeStore.setState({ resume });
  useResumeStore.temporal.getState().clear();

  return { resume, loading, error };
};
