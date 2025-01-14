import type { UrlDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { RESUME_PREVIEW_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const previewResume = async (data: { id: string }) => {
  const response = await axios.get<UrlDto>(`/resume/print/${data.id}/preview`);

  return response.data;
};

export const useResumePreview = (id: string) => {
  const {
    error,
    isPending: loading,
    data,
  } = useQuery({
    queryKey: [RESUME_PREVIEW_KEY, { id }],
    queryFn: () => previewResume({ id }),
  });

  return { url: data?.url, loading, error };
};
