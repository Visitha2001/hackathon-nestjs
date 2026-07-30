import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ArcjetModule, shield, tokenBucket, ArcjetGuard } from '@arcjet/nest';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './lib/database/prisma.module';
import { AuthModule } from './lib/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { HackathonModule } from './module/hackathon/hackathon.module';

import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArcjetModule.forRoot({
      key: process.env.ARCJET_KEY!,
      rules: [
        shield({
          mode: 'LIVE',
        }),
        tokenBucket({
          mode: 'LIVE',
          refillRate: 5,
          interval: '10s',
          capacity: 10,
        }),
      ],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    HackathonModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
})
export class AppModule {}
