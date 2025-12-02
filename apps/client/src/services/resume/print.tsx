import { t } from "@lingui/macro";
import type { ResumeDto, UrlDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";

export const printResume = async (data: { id: string } | { resume: ResumeDto }) => {
  // For guest resumes, send the full resume data to the guest endpoint
  if ("resume" in data) {
    const response = await axios.post<UrlDto>(`/resume/print/guest`, data.resume);
    return response.data;
  }

  // For regular resumes, use the ID-based endpoint
  const response = await axios.get<UrlDto>(`/resume/print/${data.id}`);
  return response.data;
};

export const usePrintResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: printResumeFn,
  } = useMutation({
    mutationFn: printResume,
    onError: (error) => {
      const message = error.message;

      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: message,
      });
    },
  });

  return { printResume: printResumeFn, loading, error };
};
