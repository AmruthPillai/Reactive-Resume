import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

const authProvidersSchema = z.array(z.enum(["email", "github", "google", "oidc"]));

export class AuthProvidersDto extends createZodDto(authProvidersSchema) { }
