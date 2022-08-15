import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    // Модель с которой будем работать
    SequelizeModule.forFeature([Category]),
    FilesModule,
  ],
})
export class CategoryModule {}
