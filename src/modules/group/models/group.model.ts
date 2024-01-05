import { Model, Column, Table, BelongsToMany, ForeignKey } from 'sequelize-typescript'
import { User } from '@/modules/user/models/user.model'
import { Sensor } from '@/modules/sensor/models/sensor.model'
import { GroupSensor } from '@/modules/group/models/group-sensor.model'

@Table
export class Group extends Model<Group> {
  @Column
  name: string

  @ForeignKey(() => User)
  @Column
  ownerId: number

  @BelongsToMany(() => User, 'GroupMembers', 'groupId', 'userId')
  members: User[]

  @BelongsToMany(() => Sensor, {
    through: {
      model: () => GroupSensor,
      unique: false,
    },
    onDelete: 'CASCADE',
    foreignKey: 'groupId',
    otherKey: 'sensorId'
  })
  sensors: Sensor[]
}
