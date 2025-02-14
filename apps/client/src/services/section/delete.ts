import {  DeleteSectionDto } from "../../../../../libs/dto/src/section";
import { axios } from "@/client/libs/axios";

export const deleteSection = async (data: DeleteSectionDto) => {
  const response = await axios.delete(`/sections/${data.id}`);
  return response.data as DeleteSectionDto;
};
