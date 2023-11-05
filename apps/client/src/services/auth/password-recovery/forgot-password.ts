import { ForgotPasswordDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const forgotPassword = async (data: ForgotPasswordDto) => {
  const response = await axios.post<void, AxiosResponse<void>, ForgotPasswordDto>(
    "/auth/forgot-password",
    data,
  );

  return response.data;
};

export const useForgotPassword = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: forgotPasswordFn,
  } = useMutation({
    mutationFn: forgotPassword,
  });

  return { forgotPassword: forgotPasswordFn, loading, error };
};
