import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { RedisProvider } from '@/providers/redis.provider'
import { InfluxdbModule } from '@/modules/influxdb/influxdb.module'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'

import { SensorDataQueueConsumer } from '@/modules/sensor-queue/sensor-queue.consumer'
import { SensorQueueService } from '@/modules/sensor-queue/sensor-queue.service'
import { SensorQueueController } from '@/modules/sensor-queue/sensor-queue.controller'

@Module({
  imports: [
    InfluxdbModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: RedisProvider,
    }),
    BullModule.registerQueueAsync({
      name: 'sensor-queue',
      useFactory: async () => ({
        limiter: { max: 10, duration: 1000 }, // have to configure this based on performance tests
      }),
    }),
  ],
  controllers: [SensorQueueController],
  providers: [SensorQueueService, SensorDataQueueConsumer, InfluxdbService],
})
export class SensorDataQueueModule {}
