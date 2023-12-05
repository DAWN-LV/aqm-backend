import { Module } from '@nestjs/common'

import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PostgreSQLProvider } from '@/providers/postgres.provider'

import { SensorDataQueueModule } from '@/modules/sensor-queue/sensor-queue.module'
import { SensorsModule } from '@/modules/sensor/sensors.module'
import { UsersModule } from '@/modules/user/users.module'
import { TokenModule } from '@/modules/token/token.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { InfluxdbModule } from '@/modules/influxdb/influxdb.module'

import { AppController } from '@/modules/app/app.controller'
import { AppService } from '@/modules/app/app.service'

import config from '@/config'

@Module({
  imports: [
    SensorsModule,
    UsersModule,
    AuthModule,
    TokenModule,
    SensorDataQueueModule,
    InfluxdbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: PostgreSQLProvider,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
