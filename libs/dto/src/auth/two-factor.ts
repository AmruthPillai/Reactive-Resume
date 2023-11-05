import { createZodDto } from "nestjs-zod/dto";
import { z } from "nestjs-zod/z";

export const twoFactorSchema = z.object({
  code: z
    .string()
    .length(6)
    .regex(/^[0-9]+$/, { message: "code must be a 6 digit number" }),
});

export class TwoFactorDto extends createZodDto(twoFactorSchema) {}

export const backupCodesSchema = z.object({
  backupCodes: z.array(z.string().length(10)),
});

export class BackupCodesDto extends createZodDto(backupCodesSchema) {}

export const twoFactorBackupSchema = z.object({
  code: z.string().length(10),
});

export class TwoFactorBackupDto extends createZodDto(twoFactorBackupSchema) {}
