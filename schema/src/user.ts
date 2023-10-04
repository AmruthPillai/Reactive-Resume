import { Order } from './order';
import { Resume } from './resume';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  password?: string;
  passwordraw?: string;
  provider: 'email' | 'google';
  resetToken?: string;
  resumes: Resume[];
  order: Order[];
  createdAt: Date;
  updatedAt: Date;
};
