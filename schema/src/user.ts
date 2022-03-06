import { Resume } from './resume';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  password?: string;
  provider: 'email' | 'google';
  resetToken?: string;
  resumes: Resume[];
  createdAt: Date;
  updatedAt: Date;
};
