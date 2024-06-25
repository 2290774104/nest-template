import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { XHttpFilter } from './common/http.filter';
import { ValidationPipe } from './common/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new XHttpFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
