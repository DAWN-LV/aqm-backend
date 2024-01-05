import { Module } from '@nestjs/common'

import { SensorsController } from '@/modules/sensor/sensors.controller'

import { SensorsService } from '@/modules/sensor/sensors.service'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'
import { HttpService } from '@/modules/http/http.service'

import { SensorGateway } from '@/modules/sensor/gateways/sensor.gateway'

@Module({
  controllers: [SensorsController],
  providers: [SensorsService, SensorGateway, InfluxdbService, HttpService],
})
export class SensorsModule {}
