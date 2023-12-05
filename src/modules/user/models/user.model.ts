import {
  Model,
  Column,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript'

import { Sensor } from '@/modules/sensor/models/sensor.model'
import { UserSensorRef } from '@/modules/sensor/models/user-sensor-ref.model'

export enum UserRole {
  STANDART = 'standart',
  ADMIN = 'admin',
  SUPERADMIN = 'superadmin',
}

@Table
export class User extends Model<User> {
  @Column
  username: string

  @Column
  avatar: string

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.STANDART,
  })
  role: string

  @Column
  email: string

  @Column
  password: string

  @BelongsToMany(() => Sensor, () => UserSensorRef)
  sensors: Sensor[]
}
