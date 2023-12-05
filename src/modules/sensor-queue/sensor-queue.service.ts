import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'

import { CreateSensorQueueDTO } from '@/modules/sensor-queue/dto/create-sensor-queue.dto'

@Injectable()
export class SensorQueueService {
  constructor(
    @InjectQueue('sensor-queue') private readonly sensorQueue: Queue,
  ) {}

  create(dto: CreateSensorQueueDTO) {
    this.sensorQueue.add(dto, { attempts: 3, removeOnComplete: true })
    return true
  }
}
