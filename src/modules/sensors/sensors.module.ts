import { Module } from '@nestjs/common'
import { SensorsService } from './sensors.service'
import { SensorsController } from './sensors.controller'
import { InfluxdbModule } from '../influxdb/influxdb.module'

@Module({
  imports: [InfluxdbModule],
  controllers: [SensorsController],
  providers: [SensorsService],
})
export class SensorsModule {}
