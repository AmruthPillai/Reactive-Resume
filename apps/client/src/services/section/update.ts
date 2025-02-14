import { CreateSectionDto, UpdateSectionDto } from "../../../../../libs/dto/src/section";
import { axios } from "@/client/libs/axios";

export const updateSection = async (data: UpdateSectionDto) => {
  const response = await axios.patch(`/sections/${data.id}`, data);
  return response.data as UpdateSectionDto;
};
