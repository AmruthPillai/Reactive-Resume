import type { Prisma } from "@prisma/client";

export type FolderCountResume = Prisma.FolderGetPayload<{
  include: { _count: { select: { resumes: true } } };
}>;
