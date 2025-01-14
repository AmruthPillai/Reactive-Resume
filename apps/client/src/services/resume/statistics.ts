import type { StatisticsDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { RESUME_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const findResumeStatisticsById = async (data: { id: string }) => {
  const response = await axios.get<StatisticsDto>(`/resume/${data.id}/statistics`);

  return response.data;
};

export const useResumeStatistics = (id: string, enabled = false) => {
  const {
    error,
    isPending: loading,
    data: statistics,
  } = useQuery({
    queryKey: [...RESUME_KEY, "statistics", id],
    queryFn: () => findResumeStatisticsById({ id }),
    enabled,
  });

  return { statistics, loading, error };
};
