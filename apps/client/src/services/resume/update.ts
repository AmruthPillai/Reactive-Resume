import { t } from "@lingui/macro";
import { ResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import debounce from "lodash.debounce";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updateResume = async (data: UpdateResumeDto) => {
  try {
    const response = await axios.patch<ResumeDto, AxiosResponse<ResumeDto>, UpdateResumeDto>(
      `/resume/${data.id}`,
      data,
    );

    queryClient.setQueryData<ResumeDto>(["resume", { id: response.data.id }], response.data);

    queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
      if (!cache) return [response.data];
      return cache.map((resume) => {
        if (resume.id === response.data.id) return response.data;
        return resume;
      });
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message ?? error.message;

      toast({
        variant: "error",
        title: t`There was an error while updating your resume.`,
        description: message,
      });
    }
  }
};

export const debouncedUpdateResume = debounce(updateResume, 500);

export const useUpdateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateResumeFn,
  } = useMutation({
    mutationFn: updateResume,
  });

  return { updateResume: updateResumeFn, loading, error };
};
