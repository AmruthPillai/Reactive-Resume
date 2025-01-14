import type { MessageDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const setup2FA = async () => {
  const response = await axios.post<MessageDto, AxiosResponse<MessageDto>>("/auth/2fa/setup");

  return response.data;
};

export const useSetup2FA = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: setup2FAFn,
  } = useMutation({
    mutationFn: setup2FA,
  });

  return { setup2FA: setup2FAFn, loading, error };
};
