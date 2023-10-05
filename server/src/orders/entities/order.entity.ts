import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Resume } from '@/resume/entities/resume.entity';
import { User } from '@/users/entities/user.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  salesAmount: number;

  @Column({ nullable: true })
  item: string;

  @Column({ unique: true })
  transactionId: string;

  @OneToOne(() => Resume, (resume) => resume.order, {})
  resume: Resume;

  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  transactionResponse?: string;

  @Column({ nullable: false })
  whatsappNumber?: string;

  @UpdateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  expiredDate: Date;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
