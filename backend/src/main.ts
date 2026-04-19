import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  await app.listen(3001);

  console.log('🚀 Backend rodando em http://localhost:3001');
}
void bootstrap();
