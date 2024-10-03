import { ImportLinkedinDto, ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const importLinkedinResume = async (data: ImportLinkedinDto) => {
  const response = await axios.post<ImportLinkedinDto, AxiosResponse<ResumeDto>, ImportLinkedinDto>(
    "/resume/import-linkedin",
    data,
  );

  return response.data;
};

export const useImportLinkedinResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: importLinkedinResumeFn,
  } = useMutation({
    mutationFn: importLinkedinResume,
    onSuccess: (data) => {
      queryClient.setQueryData<ResumeDto>(["resume", { id: data.id }], data);

      queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
        if (!cache) return [data];
        return [...cache, data];
      });
    },
  });

  return { importLinkedinResume: importLinkedinResumeFn, loading, error };
};
