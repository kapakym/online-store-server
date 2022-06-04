// Входная точка для запуска приложения

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  // Блок для мониторинга за ошибками
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () =>
      console.log(`Appliction started on PORT ${PORT}`),
    );
  } catch (error) {
    //   Вывод ошибки в консоль
    console.log(error);
  }
};

start();
