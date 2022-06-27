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
    } catch (error) {
      throw new HttpException(
        'Произошла ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
