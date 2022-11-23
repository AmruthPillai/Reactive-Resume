import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  pdfDeletionTime: parseInt(process.env.PDF_DELETION_TIME, 10) || 4 * 24 * 60 * 60 * 1000, // 4 days
}));
