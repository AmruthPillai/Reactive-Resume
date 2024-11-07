import { ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

// export const getSchemaData = async (data: { data: string; title: string }) => {
//   const response = await axios.post<string, AxiosResponse<ResumeDto>>("/resume/getValues", {
//     data,
//   });

//   return response.data;
// };

type AnyObject = Record<string, unknown>;

export const importPdfResume = async (data: string) => {
  const response = await axios.post<string, AxiosResponse<AnyObject>>("/resume/upload", {
    data,
  });

  return response.data;
};

// export const useImportPdfResume = () => {
//   const {
//     error,
//     isPending: loading,
//     mutateAsync: importResumeFn,
//   } = useMutation({
//     mutationFn: importPdfResume,
//     onSuccess: (data) => {
//       queryClient.setQueryData<ResumeDto>(["resume", { id: data.id }], data);

//       queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
//         if (!cache) return [data];
//         return [...cache, data];
//       });
//     },
//   });

//   return { importPdfResume: importResumeFn, loading, error };
// };
