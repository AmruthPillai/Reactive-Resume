import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Resume } from '@/resume/entities/resume.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('postgres.host'),
        port: configService.get<number>('postgres.port'),
        username: configService.get('postgres.username'),
        password: configService.get('postgres.password'),
        database: configService.get('postgres.database'),
        poolSize: 22,
        synchronize: true,
        entities: [User, Resume],
        ssl: configService.get('postgres.certificate') && {
          ca: Buffer.from(configService.get<string>('postgres.certificate'), 'base64').toString('ascii'),
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
