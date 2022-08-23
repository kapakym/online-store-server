import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.model';
import { TypeBrand } from './category/type-brand.model';
import { BrandModule } from './brand/brand.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { TemplateModule } from './templates/template.module';
import { Template } from './templates/template.model';
import { Brand } from './brand/brand.model';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.model';
import { ProductPicture } from './product/product.picture.model';
import { ProductInfo } from './product/product.info.model';

@Module({
  controllers: [
    // BasketProductController,
    // BrandController,
    // ProductPropertyController,
  ],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Brand,
        Category,
        TypeBrand,
        Template,
        Product,
        ProductPicture,
        ProductInfo,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    CategoryModule,
    BrandModule,
    FilesModule,
    TemplateModule,
    ProductModule,
  ],
})
export class AppModule {}
