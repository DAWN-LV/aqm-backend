import { Model, Table, Column, ForeignKey } from "sequelize-typescript"
import { Sensor } from "src/modules/sensors/models/sensor.model"
import { User } from "../../users/models/user.model"

@Table
export class UserSensorRef extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Sensor)
  @Column
  sensorId: number
}
