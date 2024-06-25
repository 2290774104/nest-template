import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsServics } from './cats.service';

@Module({
  providers: [CatsServics],
  controllers: [CatsController],
})
export class CatsModule {}
