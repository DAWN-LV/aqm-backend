import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SensorDataQueueController } from './sensor-data-queue.controller';
import { RedisProvider } from 'src/config/providers/redis.provider';
import { InfluxdbModule } from '../influxdb/influxdb.module';

import { InfluxdbService } from '../influxdb/influxdb.service';
import { SensorDataQueueConsumer } from './sensor-data-queue.consumer';
import { SensorDataQueueService } from './sensor-data-queue.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: RedisProvider,
    }),
    BullModule.registerQueueAsync({
      name: 'SENSOR_DATA_QUEUE',
      useFactory: async () => ({
        limiter: { max: 10, duration: 1000 } // have to configure this based on performance tests
      })
    }),
    InfluxdbModule,
  ],
  controllers: [SensorDataQueueController],
  providers: [SensorDataQueueService, SensorDataQueueConsumer, InfluxdbService],
})
export class SensorDataQueueModule {}
