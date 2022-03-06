import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MailService } from './mail.service';

@Global()
@Module({
  imports: [ConfigModule],
})
export class MailModule {
  static register(): DynamicModule {
    return {
      module: MailModule,
      providers: [MailService],
      exports: [MailService],
    };
  }
}
