import { axios } from "@/client/libs/axios";

export const changeTone = async (original: string, mood: string) => {
  const data = { original, mood };
  const response = await axios.post("/openai/change-tone", data);
  return response.data;
};
