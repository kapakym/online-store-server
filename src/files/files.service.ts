import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// Модуль для работы с путями
import * as path from 'path';
// Модуль для работы с файлами
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      // Генерируем уникальное имя файла
      const fileName = uuid.v4() + '.jpg';
      // Формируем путь, где будут храниться картинки
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        // Если папка не существует, то создаем ее
        fs.mkdirSync(filePath, { recursive: true });
      }
      // Записываем файл на диск
      console.log(path.join(filePath, fileName));
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      // Возращаем название файла
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
