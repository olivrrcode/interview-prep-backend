import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Global config
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
  ],
  controllers: [], // Add controllers here
  providers: [
    // Add services here
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
