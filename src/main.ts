// Входная точка для запуска приложения

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const start = async () => {
  // Блок для мониторинга за ошибками
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    const config = new DocumentBuilder()
      .setTitle('Онлайн магазин')
      .setDescription('Документация REST API')
      .setVersion('1.0.0')
      .addTag('productStore')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.use(cookieParser());
    //Совместное использование ресурсов между источниками (CORS) — это механизм, который позволяет запрашивать ресурсы из другого домена.
    app.enableCors();
    await app.listen(PORT, () =>
      console.log(`Appliction started on PORT ${PORT}`),
    );
  } catch (error) {
    //   Вывод ошибки в консоль
    console.log(error);
  }
};

start();
