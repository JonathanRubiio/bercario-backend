import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar tuberías de validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Habilitar prefijo global /api
  app.setGlobalPrefix('api');

  // Habilitar CORS
  app.enableCors({
    origin: '*', // En producción limitar al origen del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`Backend de Berçário corriendo en http://localhost:${port}`);
}
bootstrap();
