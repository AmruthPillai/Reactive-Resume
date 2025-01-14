import type { MessageDto, UpdatePasswordDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const updatePassword = async (data: UpdatePasswordDto) => {
  const response = await axios.patch<MessageDto, AxiosResponse<MessageDto>, UpdatePasswordDto>(
    "/auth/password",
    data,
  );

  return response.data;
};

export const useUpdatePassword = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updatePasswordFn,
  } = useMutation({
    mutationFn: updatePassword,
  });

  return { updatePassword: updatePasswordFn, loading, error };
};
