import type { MessageDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const disable2FA = async () => {
  const response = await axios.post<MessageDto, AxiosResponse<MessageDto>>("/auth/2fa/disable");

  return response.data;
};

export const useDisable2FA = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: disable2FAFn,
  } = useMutation({
    mutationFn: disable2FA,
  });

  return { disable2FA: disable2FAFn, loading, error };
};
