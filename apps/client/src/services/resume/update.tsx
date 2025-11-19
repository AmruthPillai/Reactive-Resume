import type { FolderDto } from "@reactive-resume/dto";
import type { ResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import debounce from "lodash.debounce";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updateResume = async (data: UpdateResumeDto) => {
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
};

export const debouncedUpdateResume = debounce(updateResume, 500);

export const useUpdateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateResumeFn,
  } = useMutation({
    mutationFn: updateResume,
    onSuccess: (data) => {
      if (data.folderId) {
        queryClient.setQueryData<FolderDto>(["folder", { id: data.folderId }], (cache) => {
          if (!cache) return cache;
          if (!cache.resumes) return cache;

          return Object.assign({}, cache, {
            resumes: cache.resumes.map((resume) => (resume.id === data.id ? data : resume)),
          });
        });
      }
    },
  });

  return { updateResume: updateResumeFn, loading, error };
};
