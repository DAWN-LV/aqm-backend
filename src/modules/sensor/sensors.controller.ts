import {
  Body,
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Req,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { JwtGuard } from '@/guards/jwt.guard'
import { SensorsService } from '@/modules/sensor/sensors.service'
import { CreateSensorDTO } from '@/modules/sensor/dto/create-sensor.dto'
import { UpdateSensorDTO } from '@/modules/sensor/dto/update-sensor.dto'

@ApiTags('sensors')
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @UseGuards(JwtGuard)
  @Get('templates')
  getTemplates() {
    return this.sensorsService.getTemplates()
  }

  @UseGuards(JwtGuard)
  @Post(':mac/play')
  play(@Param('mac') mac: string) {
    return this.sensorsService.play(mac)
  }

  @UseGuards(JwtGuard)
  @Post(':mac/pause')
  pause(@Param('mac') mac: string) {
    return this.sensorsService.pause(mac)
  }

  @UseGuards(JwtGuard)
  @Post(':mac/restart')
  restart(@Param('mac') mac: string) {
    return this.sensorsService.restart(mac)
  }
  
  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() { user }) {
    return this.sensorsService.findAll(user.id)
  }

  @UseGuards(JwtGuard)
  @Get(':sensorId')
  findOne(@Param('sensorId') sensorId: number) {
    return this.sensorsService.findOne(sensorId)
  }

  @UseGuards(JwtGuard)
  @Post()
  createSensor(@Body() dto: CreateSensorDTO, @Req() { user }) {
    return this.sensorsService.create(user.id, dto)
  }

  @UseGuards(JwtGuard)
  @Patch(':sensorId')
  updateSensor(
    @Param('sensorId') sensorId: number,
    @Body() dto: UpdateSensorDTO, 
    @Req() { user }
  ) {
    return this.sensorsService.update(user.id, sensorId, dto)
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteSensor(@Param('id') id: number, @Req() { user }) {
    return this.sensorsService.delete(user.id, id)
  }

  @UseGuards(JwtGuard)
  @Get(':sensorId/data')
  getSensorData(
    @Req() { user },
    @Param('sensorId', ParseIntPipe) sensorId: number,
    @Query('from', ParseIntPipe) from: number,
    @Query('to', ParseIntPipe) to: number,
  ) {
    return this.sensorsService.getData(user.id, sensorId, from, to)
  }
}
