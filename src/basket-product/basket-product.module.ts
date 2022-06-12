import { Module } from '@nestjs/common';
import { BasketProductService } from './basket-product.service';

@Module({
  providers: [BasketProductService]
})
export class BasketProductModule {}
