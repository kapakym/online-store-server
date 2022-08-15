import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Property } from './property.model';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property) private propertyRepository: typeof Property,
  ) {}

  async createProperty(dto: CreatePropertyDto) {
    const property = this.propertyRepository.create(dto);
  }
}
