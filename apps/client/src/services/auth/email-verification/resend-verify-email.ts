import type { MessageDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const resendVerificationEmail = async () => {
  const response = await axios.post<MessageDto, AxiosResponse<MessageDto>>(
    "/auth/verify-email/resend",
  );

  return response.data;
};

export const useResendVerificationEmail = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: resendVerificationEmailFn,
  } = useMutation({
    mutationFn: resendVerificationEmail,
  });

  return { resendVerificationEmail: resendVerificationEmailFn, loading, error };
};
