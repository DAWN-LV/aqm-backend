import { Body, Controller, UseGuards, Get, Post, Req, Param, Delete } from '@nestjs/common'
import { SensorsService } from './sensors.service'
import { CreateSensorDTO } from './dto/create-sensor.dto'
import { JwtGuard } from 'src/guards/jwt.guard'

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() { user }) {
    return this.sensorsService.findAll(user.id)
  }

  @UseGuards(JwtGuard)
  @Post()
  createSensor(@Body() dto: CreateSensorDTO, @Req() { user }) {
    return this.sensorsService.createSensor(dto, user.id)
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  deleteSensor(@Param("id") id: number, @Req() { user }) {
    return this.sensorsService.deleteSensor(user.id, id)
  }
}
