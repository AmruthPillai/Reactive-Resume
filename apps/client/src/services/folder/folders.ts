import type { FolderDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { FOLDERS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchFolders = async () => {
  const response = await axios.get<FolderDto[], AxiosResponse<FolderDto[]>>("/folder");

  return response.data;
};

export const useFolders = (enabled = true) => {
  const {
    error,
    isPending: loading,
    data: folders,
  } = useQuery({
    queryKey: FOLDERS_KEY,
    queryFn: fetchFolders,
    enabled,
  });

  return { folders, loading, error };
};
