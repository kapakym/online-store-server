import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { BasketModule } from './basket/basket.module';
import { BasketProductController } from './basket-product/basket-product.controller';
import { BasketProductModule } from './basket-product/basket-product.module';
import { ProductTypeModule } from './product-type/product-type.module';
import { ProductRaitingService } from './product-raiting/product-raiting.service';
import { ProductRaitingModule } from './product-raiting/product-raiting.module';
import { ProductPropertyController } from './product-property/product-property.controller';
import { ProductPropertyModule } from './product-property/product-property.module';
import { Basket } from './basket/basket.model';
import { ProductType } from './product-type/product-type.model';
import { ProductRaiting } from './product-raiting/product-raiting.model';
import { BasketProduct } from './basket-product/basket-product.model';
import { Products } from './products/products.model';
import { ProductProperty } from './product-property/product-property.model';
import { TypeBrand } from './product-type/type-brand.model';
import { ProductBrandController } from './product-brand/product-brand.controller';
import { ProductBrand } from './product-brand/product-brand.model';
import { ProductBrandModule } from './product-brand/product-brand.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  controllers: [
    // BasketProductController,
    // ProductBrandController,
    // ProductPropertyController,
  ],
  providers: [ProductRaitingService],
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
        Basket,
        ProductBrand,
        ProductType,
        ProductRaiting,
        BasketProduct,
        Products,
        ProductProperty,
        TypeBrand,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProductsModule,
    BasketModule,
    BasketProductModule,
    ProductTypeModule,
    ProductBrandModule,
    ProductRaitingModule,
    ProductPropertyModule,
    FilesModule,
  ],
})
export class AppModule {}
