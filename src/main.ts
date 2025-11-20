import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API Travels')
    .setDescription('Documentación de la API con autenticación JWT y roles')
    .setVersion('2.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      url: '/api-json',
    },
    customCssUrl: ['https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui.css'],
    customJs: [
      'https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist@5.10.3/swagger-ui-standalone-preset.js',
    ],
  };
  SwaggerModule.setup('api/docs', app, document, customOptions);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`app running on: http://localhost:${port}`);
}
bootstrap();
