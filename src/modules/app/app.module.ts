import { Module } from '@nestjs/common'

import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PostgreSQLProvider } from '@/providers/postgres.provider'
import { JWTProvider } from '@/providers/jwt.provider'

import { AppGateway } from '@/modules/app/gateways/app.gateway'

import { SensorDataQueueModule } from '@/modules/sensor-queue/sensor-queue.module'
import { SensorsModule } from '@/modules/sensor/sensors.module'
import { UsersModule } from '@/modules/user/users.module'
import { TokenModule } from '@/modules/token/token.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { InfluxdbModule } from '@/modules/influxdb/influxdb.module'
import { GroupModule } from '@/modules/group/group.module'

import { AppController } from '@/modules/app/app.controller'
import { AppService } from '@/modules/app/app.service'

import config from '@/config'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    SensorsModule,
    GroupModule,
    UsersModule,
    AuthModule,
    TokenModule,
    SensorDataQueueModule,
    InfluxdbModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: JWTProvider,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: PostgreSQLProvider,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
