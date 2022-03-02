import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [ConfigModule],
})
export class MailModule {
  static register(): DynamicModule {
    return {
      module: MailModule,
      controllers: [MailController],
      providers: [MailService],
      exports: [MailService],
    };
  }
}
