import type { MessageDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const verifyEmail = async (data: { token: string }) => {
  const response = await axios.post<MessageDto, AxiosResponse<MessageDto>>(
    `/auth/verify-email?token=${data.token}`,
  );

  return response.data;
};

export const useVerifyEmail = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: verifyEmailFn,
  } = useMutation({
    mutationFn: verifyEmail,
  });

  return { verifyEmail: verifyEmailFn, loading, error };
};
