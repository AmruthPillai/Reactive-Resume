import type { FolderDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const findFolderById = async (data: { id: string }) => {
  const response = await axios.get<FolderDto>(`/folder/${data.id}`);

  return response.data;
};

export const useFolder = (id: string) => {
  const {
    error,
    isPending: loading,
    data: folder,
  } = useQuery({
    queryKey: ["folder", { id }],
    queryFn: () => findFolderById({ id }),
    enabled: Boolean(id),
  });

  return { folder, loading, error };
};
