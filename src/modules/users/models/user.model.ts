import { Model, Column, Table, DataType, HasMany } from "sequelize-typescript"
import { Sensor } from "src/modules/sensors/models/sensor.model"

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

  @HasMany(() => Sensor)
  sensors: Sensor[]
}