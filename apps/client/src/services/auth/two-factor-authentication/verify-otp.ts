import { AuthResponseDto, TwoFactorDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { toast } from "@/client/hooks/use-toast";
import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { useAuthStore } from "@/client/stores/auth";

export const verifyOtp = async (data: TwoFactorDto) => {
  const response = await axios.post<AuthResponseDto, AxiosResponse<AuthResponseDto>, TwoFactorDto>(
    "/auth/2fa/verify",
    data,
  );

  return response.data;
};

export const useVerifyOtp = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: verifyOtpFn,
  } = useMutation({
    mutationFn: verifyOtp,
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

  return { verifyOtp: verifyOtpFn, loading, error };
};
