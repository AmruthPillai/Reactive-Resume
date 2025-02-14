import { axios } from "@/client/libs/axios";

export const createSection = async (data: createSectionDTO) => {
  const response = await axios.post(`/sections/${data.id}`);
  return response.data;
};
