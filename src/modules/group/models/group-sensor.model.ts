import { Model, Table, Column, ForeignKey } from 'sequelize-typescript'
import { Group } from '@/modules/group/models/group.model'
import { Sensor } from '@/modules/sensor/models/sensor.model'

@Table
export class GroupSensor extends Model<GroupSensor> {
  @ForeignKey(() => Group)
  @Column
  groupId: number

  @ForeignKey(() => Sensor)
  @Column
  sensorId: number
}