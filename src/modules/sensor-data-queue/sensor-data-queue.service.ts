import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { AddSensorDataQueueDto } from './dto/add-sensor-data-queue.dto';

@Injectable()
export class SensorDataQueueService {
  constructor(@InjectQueue('SENSOR_DATA_QUEUE') private readonly sensorDataQueue: Queue) {}
  
  async add(addSensorDataQueueDto: AddSensorDataQueueDto) {
    console.log('adding to queue: ', addSensorDataQueueDto)
    this.sensorDataQueue.add(addSensorDataQueueDto)

    console.log("added")

    return { added: true }
  }
}
