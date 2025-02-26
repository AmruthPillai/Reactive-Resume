import type { CreateSectionItemDto, SectionItemDto } from "@reactive-resume/dto";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const createSectionItem = async (data: CreateSectionItemDto) => {
  const response = await axios.post<
    SectionItemDto,
    AxiosResponse<SectionItemDto>,
    CreateSectionItemDto
  >("/sectionItem", data);
  return response.data;
};
