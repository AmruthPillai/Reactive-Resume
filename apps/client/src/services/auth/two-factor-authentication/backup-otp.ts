import { AuthResponseDto, TwoFactorBackupDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { useAuthStore } from "@/client/stores/auth";

export const backupOtp = async (data: TwoFactorBackupDto) => {
  const response = await axios.post<
    AuthResponseDto,
    AxiosResponse<AuthResponseDto>,
    TwoFactorBackupDto
  >("/auth/2fa/backup", data);

  return response.data;
};

export const useBackupOtp = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: backupOtpFn,
  } = useMutation({
    mutationFn: backupOtp,
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.setQueryData(["user"], data.user);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;

        toast({ variant: "error", title: message });
      }
    },
  });

  return { backupOtp: backupOtpFn, loading, error };
};
