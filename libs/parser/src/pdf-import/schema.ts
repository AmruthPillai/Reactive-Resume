import { z } from "zod";

export const pdfResumeSchema = z.object({});
export type PDFResume = z.infer<typeof pdfResumeSchema>;
