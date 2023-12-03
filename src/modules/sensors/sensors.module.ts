import { Module } from '@nestjs/common'
import { SensorsService } from './sensors.service'
import { SensorsController } from './sensors.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Sensor } from './models/sensor.model'
import { UserSensorRef } from './models/user-sensor-ref.model'

@Module({
  imports: [ SequelizeModule.forFeature([Sensor, UserSensorRef]) ],
  controllers: [ SensorsController ],
  providers: [ SensorsService ],
})
export class SensorsModule {}
