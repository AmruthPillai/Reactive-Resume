import { createZodDto } from "nestjs-zod/dto";

import { userSchema } from "./user";

export const searchResultSchema = userSchema.omit({
  emailVerified: true,
  twoFactorEnabled: true,
  createdAt: true,
  updatedAt: true,
});

export class SearchResultDto extends createZodDto(searchResultSchema) {
  constructor(partial: Partial<SearchResultDto>) {
    super();
    Object.assign(this, searchResultSchema.parse(partial));
  }
}
