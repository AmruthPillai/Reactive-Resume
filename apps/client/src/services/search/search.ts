import type { SearchResultDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const fetchSearchResults = async (query: string, totalResults: number) => {
  const response = await axios.get<SearchResultDto[], AxiosResponse<SearchResultDto[]>>(
    `http://localhost:5173/api/search?query=${encodeURIComponent(query)}&k=${totalResults}`,
  );
  return response.data;
};

export const useSearch = (query: string, totalResults = 10) => {
  return useQuery({
    queryKey: ["search", query, totalResults],
    queryFn: () => fetchSearchResults(query, totalResults),
    enabled: !!query, // Only run the query if there is a search query
  });
};
