import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorDataQueueService } from './sensor-data-queue.service';
import { AddSensorDataQueueDto } from './dto/add-sensor-data-queue.dto';

@Controller('sensor-data-queue')
export class SensorDataQueueController {
  constructor(private readonly sensorDataQueueService: SensorDataQueueService) {}

  @Post()
  add(@Body() addSensorDataQueueDto: AddSensorDataQueueDto) {
    return this.sensorDataQueueService.add(addSensorDataQueueDto);
  }
}
