import { z } from "zod";

import { certificationSchema } from "./certification";
import { educationSchema } from "./education";
import { emailSchema } from "./email";
import { languageSchema } from "./language";
import { positionSchema } from "./position";
import { profileSchema } from "./profile";
import { projectSchema } from "./project";
import { skillSchema } from "./skill";

export const linkedInSchema = z.object({
  Profile: z.array(profileSchema).optional(),
  "Email Addresses": z.array(emailSchema).optional(),
  Certifications: z.array(certificationSchema).optional(),
  Education: z.array(educationSchema).optional(),
  Languages: z.array(languageSchema).optional(),
  Positions: z.array(positionSchema).optional(),
  Projects: z.array(projectSchema).optional(),
  Skills: z.array(skillSchema).optional(),
});

export type LinkedIn = z.infer<typeof linkedInSchema>;
