import type { Language } from "@reactive-resume/utils";
import { useQuery } from "@tanstack/react-query";

import { LANGUAGES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchLanguages = async () => {
  const response = await axios.get<Language[]>(`/translation/languages`);

  return response.data;
};

export const useLanguages = () => {
  const {
    error,
    isPending: loading,
    data: languages,
  } = useQuery({
    queryKey: [LANGUAGES_KEY],
    queryFn: fetchLanguages,
  });

  return { languages: languages ?? [], loading, error };
};
