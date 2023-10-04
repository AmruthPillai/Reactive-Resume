import { Resume } from './resume';
import { User } from './user';

export type Order = {
  id: number;
  item: string;
  salesAmount: string;
  transactionId: string;
  resume: Resume;
  user: User;
  status: string;
  transactionResponse: string;
  whatsappNumber: string;
  createdOn: Date;
  expiredDate: Date;
};
