import type { DeleteResumeDto, FolderDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const deleteResume = async (data: DeleteResumeDto) => {
  const response = await axios.delete<ResumeDto, AxiosResponse<ResumeDto>, DeleteResumeDto>(
    `/resume/${data.id}`,
  );

  return response.data;
};

export const useDeleteResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deleteResumeFn,
  } = useMutation({
    mutationFn: deleteResume,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["resume", data.id] });

      queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
        if (!cache) return [];
        const filtered = cache.filter((resume) => resume.id !== data.id);
        return filtered;
      });

      if (data.folderId) {
        queryClient.setQueryData<FolderDto>(["folder", { id: data.folderId }], (cache) => {
          if (!cache) return cache;
          if (!cache.resumes) return cache;

          return Object.assign({}, cache, {
            resumes: cache.resumes.filter((resume) => resume.id !== data.id),
          });
        });
      }
    },
  });

  return { deleteResume: deleteResumeFn, loading, error };
};
