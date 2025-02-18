import { axios } from "@/client/libs/axios";
import { CreateSectionDto, SectionDto } from "@reactive-resume/dto";
import { AxiosResponse } from "axios";

export const createSection = async (data: CreateSectionDto) => {
  const response = await axios.post<SectionDto, AxiosResponse<SectionDto>, CreateSectionDto>(
    "/section",
    data,
  );

  return response.data;
};
