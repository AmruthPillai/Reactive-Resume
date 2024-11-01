import { User } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface ResumeResponseInterface {
  cvTitle: string;
  nameCandidate: string;
  openToWork: boolean;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  linkCv: string;
}

export interface ResumeRawDataInterface {
  id: string;
  title: string;
  slug: string;
  data: JsonValue;
  user: User;
}
