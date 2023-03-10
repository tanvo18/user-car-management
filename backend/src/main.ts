import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = +process.env.APP_PORT || 3000;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  Logger.log('Port running on: ', port);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Car APP')
    .setDescription('Car API documentation')
    .setVersion('1.0')
    .addTag('Car')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
