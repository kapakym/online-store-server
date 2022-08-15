import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { Brand } from './brand.model';

@Module({
  providers: [BrandService],
  controllers: [BrandController],
  imports: [
    // Модель с которой будем работать
    SequelizeModule.forFeature([Brand]),
    FilesModule,
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class BrandModule {}
