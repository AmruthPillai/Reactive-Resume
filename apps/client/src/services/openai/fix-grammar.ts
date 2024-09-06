import { axios } from "@/client/libs/axios";

export const fixGrammar = async (original: string) => {
  const data = { original };
  const response = await axios.post("/openai/fix-grammar", data);
  return response.data;
};
