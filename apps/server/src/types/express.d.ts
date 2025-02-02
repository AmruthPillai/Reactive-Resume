// server/src/types/express.d.ts
import { Portfolio, Resume, User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Request {
      user?: PrismaUser;
      payload?: {
        portfolio?: Portfolio; // Add portfolio to payload

        resume?: Resume;
      };
    }
  }
}

export {};
