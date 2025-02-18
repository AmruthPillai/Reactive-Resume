import type { SectionItemDto, UpdateSectionItemDto } from "@reactive-resume/dto";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const updateSectionItem = async (data: UpdateSectionItemDto) => {
  const response = await axios.patch<SectionItemDto, AxiosResponse<SectionItemDto>, UpdateSectionItemDto>(
    `/section/${data.id}`,
    data,
  );
  return response.data as UpdateSectionItemDto;
};
