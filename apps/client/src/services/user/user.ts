import type { UserDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useEffect } from "react";

import { axios } from "@/client/libs/axios";
import { useAuthStore } from "@/client/stores/auth";

export const fetchUser = async () => {
  const response = await axios.get<UserDto | undefined, AxiosResponse<UserDto | undefined>>(
    "/user/me",
  );

  return response.data;
};

export const useUser = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    setUser(user ?? null);
  }, [user, setUser]);

  return { user: user, loading, error };
};
