import type { SectionDto, UpdateSectionDto } from "@reactive-resume/dto";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const updateSection = async (data: UpdateSectionDto) => {
  const response = await axios.patch<SectionDto, AxiosResponse<SectionDto>, UpdateSectionDto>(
    `/section/${data.id}`,
    data,
  );
  return response.data as UpdateSectionDto;
};
