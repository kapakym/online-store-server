import { Module } from '@nestjs/common';
import { ProductBrandService } from './product-brand.service';

@Module({
  providers: [ProductBrandService]
})
export class ProductBrandModule {}
