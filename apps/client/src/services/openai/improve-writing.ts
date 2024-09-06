import { axios } from "@/client/libs/axios";

export const improveWriting = async (original: string) => {
  const data = { original };
  const response = await axios.post("/openai/improve-writing", data);
  return response.data;
};
