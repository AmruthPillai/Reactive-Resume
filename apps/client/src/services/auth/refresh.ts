import { MessageDto } from "@reactive-resume/dto";
import { AxiosInstance, AxiosResponse } from "axios";

export const refreshToken = async (axios: AxiosInstance) => {
  const response = await axios.post<MessageDto, AxiosResponse<MessageDto>>("/auth/refresh");

  return response.data;
};
