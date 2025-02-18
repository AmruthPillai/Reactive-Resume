import { axios } from "@/client/libs/axios";
import { CreateSectionDto, SectionItemDto } from "@reactive-resume/dto";
import { AxiosResponse } from "axios";

export const createSection = async (data: CreateSectionDto) => {
  const response = await axios.post<SectionItemDto, AxiosResponse<SectionItemDto>, CreateSectionDto>(
    "/section",
    data,
  );

  return response.data;
};
