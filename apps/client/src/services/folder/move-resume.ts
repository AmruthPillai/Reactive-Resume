import type { FolderDto, MoveResumeResponseDto, MoveResumeToFolderDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { FOLDERS_KEY, RESUMES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const moveResumeToFolder = async (data: MoveResumeToFolderDto) => {
  const response = await axios.patch<
    MoveResumeResponseDto,
    AxiosResponse<MoveResumeResponseDto>,
    MoveResumeToFolderDto
  >(`/folder/move-resume/${data.id}`, data);

  return response.data;
};
const updateFolderInCache = (folder: FolderDto | undefined) => {
  if (!folder) return;

  queryClient.setQueryData(["folder", { id: folder.id }], folder);
  queryClient.setQueryData<FolderDto[]>(FOLDERS_KEY, (cache) => {
    if (!cache) return [folder];

    return [...cache.filter((f) => f.id !== folder.id), folder];
  });
};

export const useMoveResumeToFolder = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: moveResumeToFolderFn,
  } = useMutation({
    mutationFn: moveResumeToFolder,
    onSuccess: async (data) => {
      const { targetFolder, sourceFolder } = data;

      updateFolderInCache(sourceFolder);
      updateFolderInCache(targetFolder);
      await queryClient.invalidateQueries({ queryKey: RESUMES_KEY });
    },
  });

  return { moveResumeToFolder: moveResumeToFolderFn, loading, error };
};
