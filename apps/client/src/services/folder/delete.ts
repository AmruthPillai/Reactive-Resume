import type { DeleteFolderDto, FolderDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { RESUMES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const deleteFolder = async (data: DeleteFolderDto) => {
  const response = await axios.delete<FolderDto, AxiosResponse<FolderDto>, DeleteFolderDto>(
    `/folder/${data.id}?isDeleteResumes=${data.isDeleteResumes}`,
  );
  return response.data;
};

const updateResumeInCache = (resume: ResumeDto) => {
  queryClient.setQueryData<ResumeDto[]>(RESUMES_KEY, (cache) => {
    if (!cache) return [resume];
    return [...cache.filter((r) => r.id !== resume.id), resume];
  });
};

export const useDeleteFolder = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deleteFolderFn,
  } = useMutation({
    mutationFn: deleteFolder,
    onSuccess: async (data, variables) => {
      const folderData = queryClient.getQueryData<FolderDto>(["folder", { id: data.id }]);
      const resumesInFolder = folderData?.resumes || [];

      queryClient.removeQueries({ queryKey: ["folder", data.id] });

      queryClient.setQueryData<FolderDto[]>(["folders"], (cache) => {
        if (!cache) return [];
        return cache.filter((folder) => folder.id !== data.id);
      });

      if (!variables.isDeleteResumes) {
        resumesInFolder.forEach((resume) => {
          const updatedResume = Object.assign({}, resume, { folderId: null });
          updateResumeInCache(updatedResume);
        });
      }
    },
  });

  return { deleteFolder: deleteFolderFn, loading, error };
};
