import { Model, Column, Table, DataType, HasMany, BelongsToMany } from "sequelize-typescript"
import { Sensor } from "src/modules/sensors/models/sensor.model"
import { UserSensorRef } from "../../sensors/models/user-sensor-ref.model"

export enum UserRole {
  STANDART = "standart",
  ADMIN = "admin",
  SUPERADMIN = "superadmin"
}

@Table
export class User extends Model {
  @Column
  username: string

  @Column
  avatar: string 

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.STANDART
  })
  role: "admin" | "user"

  @Column
  email: string

  @Column
  password: string

  @BelongsToMany(() => Sensor, () => UserSensorRef)
  sensors: Sensor[]
}