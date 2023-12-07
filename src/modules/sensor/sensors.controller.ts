import {
  Body,
  Controller,
  UseGuards,
  Get,
  Post,
  Req,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { JwtGuard } from '@/guards/jwt.guard'
import { SensorsService } from '@/modules/sensor/sensors.service'
import { CreateSensorDTO } from '@/modules/sensor/dto/create-sensor.dto'
import { ApiBearerAuth } from '@nestjs/swagger'

@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAllBy(@Req() { user }) {
    return this.sensorsService.findAllBy(user.id)
  }

  @UseGuards(JwtGuard)
  @Post()
  createSensor(@Body() dto: CreateSensorDTO, @Req() { user, sensor: { mac } }) {
    return this.sensorsService.createSensor(user.id, { ...dto, mac })
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteSensor(@Param('id') id: number, @Req() { user }) {
    return this.sensorsService.deleteSensor(user.id, id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(':id/data/query')
  getSensorData(
    @Req() { user },
    @Param('id', ParseIntPipe) id: number,
    @Query('aggregation') agg: string,
    @Query('from', ParseIntPipe) from: number,
    @Query('to', ParseIntPipe) to: number,
  ) {
    return this.sensorsService.getSensorData(user?.id, id, agg, from, to)
  }
}
