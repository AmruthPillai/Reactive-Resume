import { createZodDto } from "nestjs-zod/dto";

import { userSchema } from "./user";

export const updateUserSchema = userSchema.partial().pick({
  name: true,
  locale: true,
  username: true,
  email: true,
  picture: true,
});

export class UpdateUserDto extends createZodDto(updateUserSchema) {}
