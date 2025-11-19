import type { DeleteFolderDto, FolderDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const deleteFolder = async (data: DeleteFolderDto) => {
  const response = await axios.delete<FolderDto, AxiosResponse<FolderDto>, DeleteFolderDto>(
    `/folder/${data.id}?isDeleteResumes=${data.isDeleteResumes}`,
  );
  return response.data;
};

export const useDeleteFolder = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: deleteFolderFn,
  } = useMutation({
    mutationFn: deleteFolder,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["folder", data.id] });

      queryClient.setQueryData<FolderDto[]>(["folders"], (cache) => {
        if (!cache) return [];
        return cache.filter((folder) => folder.id !== data.id);
      });
    },
  });

  return { deleteFolder: deleteFolderFn, loading, error };
};
