import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { SensorDataQueueService } from './sensor-data-queue.service';
import { SensorDataQueueController } from './sensor-data-queue.controller';
import { SensorDataQueueConsumer } from './sensor-data-queue.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisProvider } from 'src/config/providers/redis.provider';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: RedisProvider,
    }),
    BullModule.registerQueueAsync({
      name: 'SENSOR_DATA_QUEUE'
    })
  ],
  controllers: [SensorDataQueueController],
  providers: [SensorDataQueueService, SensorDataQueueConsumer],
})
export class SensorDataQueueModule {}
