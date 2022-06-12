import { Module } from '@nestjs/common';
import { ProductPropertyService } from './product-property.service';

@Module({
  providers: [ProductPropertyService]
})
export class ProductPropertyModule {}
