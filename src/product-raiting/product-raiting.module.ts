import { Module } from '@nestjs/common';
import { ProductRaitingController } from './product-raiting.controller';

@Module({
  controllers: [ProductRaitingController]
})
export class ProductRaitingModule {}
