import { Basics, Metadata, Section } from 'schema';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

import { User } from '@/users/entities/user.entity';

@Entity()
@Unique(['user', 'slug'])
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  shortId: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  image?: string;

  @ManyToOne(() => User, (user) => user.resumes, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ type: 'jsonb', default: {} })
  basics: Basics;

  @Column({ type: 'jsonb', default: {} })
  sections: Partial<Record<string, Section>>;

  @Column({ type: 'jsonb', default: {} })
  metadata: Metadata;

  @Column({ default: false })
  public: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(partial: Partial<Resume>) {
    Object.assign(this, partial);
  }
}
