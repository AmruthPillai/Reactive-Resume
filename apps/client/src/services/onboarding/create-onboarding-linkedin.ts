import { OnboardingLinkedinDto } from "@reactive-resume/dto";
import { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const createOnboardingLinkedin = async (data: OnboardingLinkedinDto) => {
  const response = await axios.post<
    OnboardingLinkedinDto,
    AxiosResponse<OnboardingLinkedinDto>,
    OnboardingLinkedinDto
  >("/onboarding/linkedin", data);
  return response.data;
};
