import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = Number(process.env.PORT); // PORT CONNECTED WITH ENV
  await app.listen(port);
}
bootstrap();
