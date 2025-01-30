import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load global configuration
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 50, // Limit of 50 requests per minute
      },
    ]),
  ],
  controllers: [], // No controllers globally, but modules will have their own controllers
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard }, // Apply throttling globally
  ],
})
export class AppModule {}
