import type { ResumeDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const findResumeById = async (data: { id: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/${data.id}`);

  return response.data;
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};

export const setDefault = async (data: { resumeId: string; userId: string }) => {
  const response = await axios.patch(`/resume/${data.resumeId}/setDefault`, {
    userId: data.userId,
  });
  return response.data;
};
