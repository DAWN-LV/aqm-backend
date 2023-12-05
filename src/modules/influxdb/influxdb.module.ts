import { Module } from '@nestjs/common'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'

@Module({
  providers: [InfluxdbService],
  exports: [InfluxdbService],
})
export class InfluxdbModule {}
