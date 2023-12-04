import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { AddSensorDataQueueDto } from './dto/add-sensor-data-queue.dto';

@Injectable()
export class SensorDataQueueService {
  constructor(@InjectQueue('SENSOR_DATA_QUEUE') private readonly sensorDataQueue: Queue) {}
  
  async add(addSensorDataQueueDto: AddSensorDataQueueDto) {
    this.sensorDataQueue.add(
      addSensorDataQueueDto,
      {
        attempts: 3,
        removeOnComplete: true,
      }
    )

    return { added: true }
  }
}
