import { Model, Column, Table, ForeignKey, BelongsTo } from "sequelize-typescript"
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

  @ForeignKey(() => User)
  @Column
  userId: number

  @BelongsTo(() => User)
  user: User
}