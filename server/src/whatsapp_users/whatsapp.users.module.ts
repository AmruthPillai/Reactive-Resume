import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '@/mail/mail.module';

import { WhatsappUser } from './entities/whatsapp-user.entity';
import { WhatsappUsersService } from './whatsapp.users.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhatsappUser]), MailModule],
  providers: [WhatsappUsersService],
  exports: [WhatsappUsersService],
})
export class WhatsappUsersModule {}
