import type { CreateFolderDto, FolderDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { FOLDERS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const createFolder = async (data: CreateFolderDto) => {
  const response = await axios.post<FolderDto, AxiosResponse<FolderDto>, CreateFolderDto>(
    "/folder",
    data,
  );

  return response.data;
};

export const useCreateFolder = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: createFolderFn,
  } = useMutation({
    mutationFn: createFolder,
    onSuccess: (data) => {
      queryClient.setQueryData<FolderDto>(["folder", { id: data.id }], data);

      queryClient.setQueryData<FolderDto[]>(FOLDERS_KEY, (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });

  return { createFolder: createFolderFn, loading, error };
};
