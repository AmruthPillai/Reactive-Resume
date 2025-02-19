import { DeleteDto } from "@reactive-resume/dto";
import { axios } from "@/client/libs/axios";

export const deleteSectionItem = async (data: DeleteDto) => {
  const response = await axios.delete(`/sections/${data.id}`);
  return response.data as DeleteDto;
};
