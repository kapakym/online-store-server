import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { ProductBrandController } from './product-brand.controller';
import { ProductBrand } from './product-brand.model';
import { ProductBrandService } from './product-brand.service';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [ProductBrandService],
  controllers: [ProductBrandController],
  imports: [
    // Модель с которой будем работать
    SequelizeModule.forFeature([ProductBrand]),
    FilesModule,
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class ProductBrandModule {}
