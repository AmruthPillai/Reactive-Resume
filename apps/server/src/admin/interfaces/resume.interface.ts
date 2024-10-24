import { User } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface ResumeResponseInterface {
  cvTitle: string;
  nameCandidate: string;
  openToWork: boolean;
  ownerName: string;
  ownerEmail: string;
  linkCv: string;
  linkListCvOwner: string;
}

export interface ResumeRawDataInterface {
  id: string;
  title: string;
  slug: string;
  data: JsonValue;
  user: User;
}
