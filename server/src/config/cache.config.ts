import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  pdfDeletionTime: parseInt(process.env.PDF_DELETION_TIME, 10),
}));
