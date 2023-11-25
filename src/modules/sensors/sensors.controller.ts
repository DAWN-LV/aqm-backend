import { Body, Controller, Get, Post } from '@nestjs/common'
import { SensorsService } from './sensors.service'
import { CreateSensorDTO } from './dto/create-sensor.dto'

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get()
  findAll() {
    return this.sensorsService.findAll()
  }

  @Post()
  createSensor(@Body() dto: CreateSensorDTO) {
    return this.sensorsService.createSensor(dto)
  }
}
