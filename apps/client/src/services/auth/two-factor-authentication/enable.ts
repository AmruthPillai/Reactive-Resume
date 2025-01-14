import type { BackupCodesDto, TwoFactorDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const enable2FA = async (data: TwoFactorDto) => {
  const response = await axios.post<BackupCodesDto, AxiosResponse<BackupCodesDto>, TwoFactorDto>(
    "/auth/2fa/enable",
    data,
  );

  return response.data;
};

export const useEnable2FA = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: enable2FAFn,
  } = useMutation({
    mutationFn: enable2FA,
  });

  return { enable2FA: enable2FAFn, loading, error };
};
