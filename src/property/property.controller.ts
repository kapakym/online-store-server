import { Body, Controller, Post } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.createProperty(dto);
  }
}
