import type { FolderDto, UpdateFolderDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { FOLDERS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updateFolder = async (data: UpdateFolderDto) => {
  const response = await axios.patch<FolderDto, AxiosResponse<FolderDto>, UpdateFolderDto>(
    `/folder/${data.id}`,
    data,
  );

  return response.data;
};

export const useUpdateFolder = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateFolderFn,
  } = useMutation({
    mutationFn: updateFolder,
    onSuccess: (data) => {
      queryClient.setQueryData<FolderDto>(["folder", { id: data.id }], data);

      queryClient.setQueryData<FolderDto[]>(FOLDERS_KEY, (cache) => {
        if (!cache) return [data];
        const updatedCache = [...cache.filter((folder) => folder.id !== data.id), data];

        return updatedCache;
      });
    },
  });

  return { updateFolder: updateFolderFn, loading, error };
};
