import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './common/filters/exceptions-filter';
import { HttpExceptionsFilter } from './common/filters/http-exceptions-filter';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 全局绑定验证管道
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // 全局绑定异常过滤器
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  await app.listen(3000);
}
bootstrap();
