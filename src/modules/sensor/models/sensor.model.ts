import {
  Model,
  Column,
  Table,
  BelongsToMany,
} from 'sequelize-typescript'
import { UserSensorRef } from '@/modules/sensor/models/user-sensor-ref.model'
import { User } from '@/modules/user/models/user.model'

@Table
export class Sensor extends Model<Sensor> {
  @Column
  name: string

  @Column
  ip: string

  @Column
  mac: string

  @Column
  threshold: number

  @Column
  status: string

  @BelongsToMany(() => User, () => UserSensorRef)
  users: User[]
}
