import { Basics } from './basics';
import { Metadata } from './metadata';
import { Section } from './section';
import { User } from './user';

export type Resume = {
  id: number;
  shortId: string;
  name: string;
  slug: string;
  image: string;
  user: User;
  basics: Basics;
  sections: Record<string, Section>;
  metadata: Metadata;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
};
