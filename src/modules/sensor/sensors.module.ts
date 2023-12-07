import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { SensorsController } from '@/modules/sensor/sensors.controller'
import { SensorsService } from '@/modules/sensor/sensors.service'
import { User } from '@/modules/user/models/user.model'
import { Sensor } from '@/modules/sensor/models/sensor.model'
import { UserSensorRef } from '@/modules/sensor/models/user-sensor-ref.model'
import { SensorGateway } from '@/modules/sensor/gateways/sensor.gateway'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'

@Module({
  imports: [SequelizeModule.forFeature([Sensor, User, UserSensorRef])],
  controllers: [SensorsController],
  providers: [SensorsService, SensorGateway, InfluxdbService],
})
export class SensorsModule {}
