import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3005, () => console.log(`Server started on port - 3005`));
}
bootstrap();
