import { z } from "zod";

export const LocationSchema = z.object({
  address: z.string(),
  city: z.string(),
  region: z.string(),
  country: z.string(),
  postalCode: z.string()
});
export type Location = z.infer<typeof LocationSchema>;

export const ProfileSchema = z.object({
  id: z.string().optional(),
  network: z.string(),
  username: z.string(),
  url: z.string().optional()
});
export type Profile = z.infer<typeof ProfileSchema>;

export const PhotoShapeSchema = z.enum(['square', 'rounded-square', 'circle']);
export type PhotoShape = z.infer<typeof PhotoShapeSchema>;

export const PhotoFiltersSchema = z.object({
  size: z.number(),
  shape: PhotoShapeSchema,
  border: z.boolean(),
  grayscale: z.boolean()
});
export type PhotoFilters = z.infer<typeof PhotoFiltersSchema>;

export const PhotoSchema = z.object({
  url: z.string().optional(),
  visible: z.boolean(),
  filters: PhotoFiltersSchema
});
export type Photo = z.infer<typeof PhotoSchema>;

export const BasicsSchema = z.object({
  name: z.string(),
  photo: PhotoSchema,
  email: z.string(),
  phone: z.string(),
  website: z.string(),
  headline: z.string(),
  birthdate: z.string(),
  summary: z.string(),
  location: LocationSchema,
  profiles: z.array(ProfileSchema)
});
export type Basics = z.infer<typeof BasicsSchema>;
