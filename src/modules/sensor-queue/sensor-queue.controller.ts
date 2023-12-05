import { Controller, Post, Body } from '@nestjs/common'

import { SensorQueueService } from '@/modules/sensor-queue/sensor-queue.service'
import { CreateSensorQueueDTO } from '@/modules/sensor-queue/dto/create-sensor-queue.dto'

@Controller('sensor-queue')
export class SensorQueueController {
  constructor(
    private readonly sensorQueueService: SensorQueueService,
  ) {}

  @Post()
  create(@Body() dto: CreateSensorQueueDTO) {
    return this.sensorQueueService.create(dto)
  }
}
