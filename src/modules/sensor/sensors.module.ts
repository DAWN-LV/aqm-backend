import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { SensorsController } from '@/modules/sensor/sensors.controller'

import { SensorsService } from '@/modules/sensor/sensors.service'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'

import { SensorGateway } from '@/modules/sensor/gateways/sensor.gateway'

import { MqttModule } from '@/modules/mqtt/mqtt.module'

@Module({
  imports: [HttpModule, MqttModule],
  controllers: [SensorsController],
  providers: [SensorsService, SensorGateway, InfluxdbService],
})
export class SensorsModule {}
