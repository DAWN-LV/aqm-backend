import { Module } from '@nestjs/common'

import { SequelizeModule } from '@nestjs/sequelize'
import { SensorsController } from '@/modules/sensor/sensors.controller'

import { User } from '@/modules/user/models/user.model'
import { Sensor } from '@/modules/sensor/models/sensor.model'
import { UserSensorRef } from '@/modules/sensor/models/user-sensor-ref.model'

import { SensorsService } from '@/modules/sensor/sensors.service'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'
import { HttpService } from '@/modules/http/http.service'

import { SensorGateway } from '@/modules/sensor/gateways/sensor.gateway'

@Module({
  imports: [SequelizeModule.forFeature([Sensor, User, UserSensorRef])],
  controllers: [SensorsController],
  providers: [SensorsService, SensorGateway, InfluxdbService, HttpService],
})
export class SensorsModule {}
