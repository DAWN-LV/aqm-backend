import { ServeStaticModule } from '@nestjs/serve-static'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PostgreSQLProvider } from '@/providers/postgres.provider'
import { JWTProvider } from '@/providers/jwt.provider'

import { SensorDataQueueModule } from '@/modules/sensor-queue/sensor-queue.module'
import { SensorsModule } from '@/modules/sensor/sensors.module'
import { UsersModule } from '@/modules/user/users.module'
import { TokenModule } from '@/modules/token/token.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { InfluxdbModule } from '@/modules/influxdb/influxdb.module'
import { GroupModule } from '@/modules/group/group.module'

import { AppController } from '@/modules/app/app.controller'
import { AppGateway } from '@/modules/app/gateways/app.gateway'
import { AppService } from '@/modules/app/app.service'

import config from '@/config'
import { join } from 'path'

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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', '..', 'aqm-frontend', 'dist'),
    })
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
