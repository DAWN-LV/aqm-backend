import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sensors')
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get()
  findAll(): string {
    return this.sensorsService.findAll();
  }

  @Post()
  createSenson(@Body() dto: any): Promise<void> {
    return dto;
  }
}
