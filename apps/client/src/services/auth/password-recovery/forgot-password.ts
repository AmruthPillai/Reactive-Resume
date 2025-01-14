import type { ForgotPasswordDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const forgotPassword = async (data: ForgotPasswordDto) => {
  return axios.post<undefined, AxiosResponse<undefined>, ForgotPasswordDto>(
    "/auth/forgot-password",
    data,
  );
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
