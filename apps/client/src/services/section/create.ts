import type { CreateSectionDto, SectionDto } from "@reactive-resume/dto";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const createSection = async (data: CreateSectionDto) => {
  const response = await axios.post<SectionDto, AxiosResponse<SectionDto>, CreateSectionDto>(
    "/section",
    data,
  );
  return response.data;
};
