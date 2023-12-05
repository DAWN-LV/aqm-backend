import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { User } from '@/modules/user/models/user.model'
import { Sensor } from '@/modules/sensor/models/sensor.model'
import { UserSensorRef } from '@/modules/sensor/models/user-sensor-ref.model'

@Injectable()
export class PostgreSQLProvider implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      uri: this.configService.get('db.postgres.uri'),
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      synchronize: true,
      autoLoadModels: true,
      models: [User, Sensor, UserSensorRef],
    }
  }
}
