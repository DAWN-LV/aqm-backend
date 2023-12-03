import { Model, Column, Table, ForeignKey, HasMany, BelongsToMany } from "sequelize-typescript"
import { UserSensorRef } from "src/modules/sensors/models/user-sensor-ref.model"
import { User } from "src/modules/users/models/user.model"

@Table
export class Sensor extends Model {
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
