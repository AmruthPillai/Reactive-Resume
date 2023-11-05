import { ResetPasswordDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const resetPassword = async (data: ResetPasswordDto) => {
  const response = await axios.post<void, AxiosResponse<void>, ResetPasswordDto>(
    "/auth/reset-password",
    data,
  );

  return response.data;
};

export const useResetPassword = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: resetPasswordFn,
  } = useMutation({
    mutationFn: resetPassword,
  });

  return { resetPassword: resetPasswordFn, loading, error };
};
