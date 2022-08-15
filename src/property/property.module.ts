import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Property } from './property.model';

@Module({
  providers: [PropertyService],
  controllers: [PropertyController],
  imports: [SequelizeModule.forFeature([Property])],
})
export class PropertyModule {}
