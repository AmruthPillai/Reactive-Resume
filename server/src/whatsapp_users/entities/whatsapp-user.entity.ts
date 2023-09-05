import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'Whatsappuser' })
export class WhatsappUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  whatsappName: string;

  @Column({ unique: true })
  whatsappNumber: string;

  @Column({ nullable: true })
  lastSessionSelection?: string;

  @Column({ nullable: true })
  currentSession?: string;

  @Column({ nullable: true })
  previewUrl?: string;

  @Column({ nullable: true })
  lastCvDetails?: string;

  @Column({ nullable: true })
  lastjobDescription?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
