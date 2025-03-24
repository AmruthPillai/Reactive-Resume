import { useMutation } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";
import { useAuthStore } from "@/client/stores/auth";

export const logout = () => axios.post("/auth/logout");

export const useLogout = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: logoutFn,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(["resumes"], null);
    },
    onError: () => {
      setUser(null);
      queryClient.setQueryData(["user"], null);
      queryClient.setQueryData(["resumes"], null);
    },
  });

  return { logout: logoutFn, loading, error };
};
