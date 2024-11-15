import { OnboardingLinkedinDto, UserDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
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

export const useSubscription = () => {
  const { user } = useUser();
  const subscription = user?.subscription;

  const isPro = subscription?.isPro;
  const isCanceled = subscription?.isCanceled;

  return {
    isCancelled: isCanceled,
    isPro: isPro,
    subscription: subscription,
  };
};

export const fetchOnboardingLinkedin = async (onboardingLinkedinId: string) => {
  const response = await axios.get<OnboardingLinkedinDto>(
    `/onboarding/linkedin/${onboardingLinkedinId}`,
  );
  return response.data;
};
