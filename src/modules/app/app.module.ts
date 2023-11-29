import { Module } from '@nestjs/common'

import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { PostgreSQLProvider } from 'src/config/providers/postgres.provider'
import { SensorsModule } from '../sensors/sensors.module'
import { UsersModule } from '../users/users.module'
import { TokenModule } from '../token/token.module'
import { AuthModule } from '../auth/auth.module'
import { SensorDataQueueModule } from '../sensor-data-queue/sensor-data-queue.module';

import { AppController } from './app.controller'
import { AppService } from './app.service'

import config from '../../config'

@Module({
  imports: [
    SensorsModule,
    UsersModule,
    AuthModule,
    TokenModule,
    SensorDataQueueModule,
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
