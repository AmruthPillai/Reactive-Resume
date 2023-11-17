import { t } from "@lingui/macro";
import { StatisticsDto, UrlDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";

import { RESUME_KEY } from "@/client/constants/query-keys";
import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const printResume = async (data: { id: string }) => {
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
    onSuccess: (_, { id }) => {
      queryClient.setQueryData([...RESUME_KEY, "statistics", id], (cache: StatisticsDto) => {
        if (cache === undefined) return cache;
        return { ...cache, downloads: cache.downloads + 1 } satisfies StatisticsDto;
      });
    },
    onError: (error) => {
      const message = error?.message;

      toast({
        variant: "error",
        title: t`Oops, the server returned an error.`,
        description: message,
      });
    },
  });

  return { printResume: printResumeFn, loading, error };
};
