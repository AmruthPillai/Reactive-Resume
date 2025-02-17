import { axios } from "@/client/libs/axios";
import { CreateSectionDto, SectionDto } from "@reactive-resume/dto";
import { AxiosResponse } from "axios";

export const createSection = async (data: CreateSectionDto) => {
  console.log("Sending data:", data);
  const response = await axios.post<SectionDto, AxiosResponse<SectionDto>, CreateSectionDto>(
    "/section",
    data,
  );

  console.log("Received data:",response.data);
  return response.data;
};
