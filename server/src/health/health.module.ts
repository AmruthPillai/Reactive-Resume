import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from './health.controller';

@Module({
  imports: [HttpModule, TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
