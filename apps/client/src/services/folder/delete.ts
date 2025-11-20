import type { DeleteFolderDto, FolderDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { FOLDERS_KEY, RESUMES_KEY } from "@/client/constants/query-keys";
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
    onSuccess: (data, variables) => {
      const folderQueryKey = ["folder", { id: data.id }] as const;

      const folderData = queryClient.getQueryData<FolderDto>(folderQueryKey);
      const resumesInFolder = folderData?.resumes ?? [];

      queryClient.setQueryData<FolderDto[]>(FOLDERS_KEY, (cache) => {
        if (!cache) return [];
        return cache.filter((folder) => folder.id !== data.id);
      });

      if (!variables.isDeleteResumes) {
        for (const resume of resumesInFolder) {
          const updatedResume = Object.assign({}, resume, { folderId: null });
          updateResumeInCache(updatedResume);
        }
      }
    },
  });

  return { deleteFolder: deleteFolderFn, loading, error };
};
