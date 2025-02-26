import type { SectionItemDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { SECTIONS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchSections = async () => {
  const response = await axios.get<SectionItemDto[], AxiosResponse<SectionItemDto[]>>(
    "/sectionItem",
  );

  return response.data;
};

export const useSections = () => {
  const {
    error,
    isPending: loading,
    data: sections,
  } = useQuery({
    queryKey: SECTIONS_KEY,
    queryFn: fetchSections,
  });

  return { sections, loading, error };
};
