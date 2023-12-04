import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

// import { userSchema } from "../user";

export const customerSchema = z.object({
  // UUID from auth.users
  id: idSchema,
  // The user's customer ID in Stripe. User must not be able to update this.
  stripeCustomerId: z.string().max(255),
});

export class CustomersDto extends createZodDto(customerSchema) {}
