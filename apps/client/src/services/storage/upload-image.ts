import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const uploadImage = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.put<string, AxiosResponse<string>, FormData>("/storage/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const useUploadImage = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: uploadImageFn,
  } = useMutation({
    mutationFn: uploadImage,
  });

  return { uploadImage: uploadImageFn, loading, error };
};
