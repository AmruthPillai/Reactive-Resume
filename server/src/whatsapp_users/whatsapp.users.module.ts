import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '@/mail/mail.module';

import { WhatsappUser } from './entities/whatsapp-user.entity';
import { WhatsappUserService } from './whatsapp.users.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhatsappUser]), MailModule],
  providers: [WhatsappUserService],
  exports: [WhatsappUserService],
})
export class WhatsappUsersModule {}
