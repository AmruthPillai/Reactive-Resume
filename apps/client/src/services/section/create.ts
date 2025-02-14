import { axios } from "@/client/libs/axios";
import { CreateSectionDto } from "../../../../../libs/dto/src/section/create";

export const createSection = async (data: CreateSectionDto) => {
  const response = await axios.post(`/sections/${data.id}`, data);
  return response.data as CreateSectionDto;
};
