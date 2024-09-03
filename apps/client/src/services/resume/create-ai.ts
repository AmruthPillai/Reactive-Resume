import { CreateAiResumeDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const createAiResume = async (data: CreateAiResumeDto) => {
  const response = await axios.post<ResumeDto, AxiosResponse<ResumeDto>, CreateAiResumeDto>(
    "/resume/create-ai",
    data,
  );

  return response.data;
};

export const useCreateAiResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createAiResumeFn,
  } = useMutation({
    mutationFn: createAiResume,
    onSuccess: (data) => {
      queryClient.setQueryData<ResumeDto>(["resume", { id: data.id }], data);

      queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });

  return { createAiResume: createAiResumeFn, loading, error };
};
