import { Injectable } from '@nestjs/common'

import data from './sensor.data'
import { InfluxdbService } from '../influxdb/influxdb.service'
import { Point } from '@influxdata/influxdb-client'

@Injectable()
export class SensorsService {
  constructor(private readonly influxdbService: InfluxdbService) {}

  findAll(): any {
    return data
  }
}
