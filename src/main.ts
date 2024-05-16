import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const loggerLevelString = process.env.LOGGER_LEVEL;
  const loggerLevel = loggerLevelString.replace(/'/g, '"');
  const app = await NestFactory.create(AppModule, {
    logger: JSON.parse(loggerLevel) ?? ['log', 'error'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('/api/v1');
  app.enableCors({
    origin: process.env.CORS_ENABLED_ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization',
  });
  app.useGlobalFilters();
  const config = new DocumentBuilder()
    .setTitle('API - MKS Teste - Sistema de Catálogo de Filmes')
    .setDescription('Sistema de Catálogo de Filmes com Autenticação JWT')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Users', 'Endpoints related to user operations')
    .addTag('Movies', 'Endpoints related to movie operations')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(Number(process.env.PORT) || 3000, '0.0.0.0');
}
bootstrap();
