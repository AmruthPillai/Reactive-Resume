import { LanguageDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const fetchLanguages = async () => {
  const response = await axios.get<LanguageDto[]>(`/translation/languages`);

  return response.data;
};

export const useLanguages = () => {
  const {
    error,
    isPending: loading,
    data: languages,
  } = useQuery({
    queryKey: ["translation", "languages"],
    queryFn: fetchLanguages,
  });

  return { languages: languages ?? [], loading, error };
};
