import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './system/cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { XAuthGuard } from './common/auth.guard';

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: XAuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
