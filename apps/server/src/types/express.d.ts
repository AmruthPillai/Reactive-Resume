// server/src/types/express.d.ts
import { Portfolio, Resume, User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user?: PrismaUser;
      payload?: {
        resume?: Resume;
        portfolio?: Portfolio; // Add this line
      };
    }
  }
}

export {};
