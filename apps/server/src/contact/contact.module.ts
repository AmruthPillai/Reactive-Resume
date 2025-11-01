import { Module } from "@nestjs/common";
import { MailModule } from "@/server/mail/mail.module";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";

@Module({
  imports: [MailModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
