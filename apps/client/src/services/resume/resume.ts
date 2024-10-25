import { ResumeDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const findResumeById = async (data: { id: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/${data.id}`);

  return response.data;
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};

export const findResumeWithAdminKey = async (data: {
  username: string;
  slug: string;
  key: string;
}) => {
  const response = await axios.get<ResumeDto>(`/resume/admin/${data.username}/${data.slug}`, {
    headers: {
      "X-Admin-Key": data.key,
    },
  });

  return response.data;
};
