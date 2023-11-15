import { Injectable } from '@nestjs/common';

import data from './sensor.data'
import { InfluxdbService } from '../influxdb/influxdb.service';

@Injectable()
export class SensorsService {
  constructor(private readonly influxdbService: InfluxdbService) {
    this.influxdbService = influxdbService
  }

  findAll(): any {
    return data;
  }

  async writeTest() {
    await this.influxdbService.writeTestData();
  }
}
