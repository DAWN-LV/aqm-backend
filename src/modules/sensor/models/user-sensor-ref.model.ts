import {
  Model,
  Table,
  Column,
  ForeignKey,
} from 'sequelize-typescript'

import { Sensor } from '@/modules/sensor/models/sensor.model'
import { User } from '@/modules/user/models/user.model'

@Table
export class UserSensorRef extends Model<UserSensorRef> {
  @ForeignKey(() => User)
  @Column
  userId: number

  @ForeignKey(() => Sensor)
  @Column
  sensorId: number
}
