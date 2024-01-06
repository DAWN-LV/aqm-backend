import { Module } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'

import { SensorsController } from '@/modules/sensor/sensors.controller'

import { SensorsService } from '@/modules/sensor/sensors.service'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'

import { SensorGateway } from '@/modules/sensor/gateways/sensor.gateway'

@Module({
  controllers: [SensorsController],
  providers: [SensorsService, SensorGateway, InfluxdbService, HttpService],
})
export class SensorsModule {}
