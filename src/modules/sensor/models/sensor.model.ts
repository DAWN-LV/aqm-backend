import {
  Model,
  Column,
  Table,
  BelongsToMany,
  DataType,
  ForeignKey,
  Length,
  IsIP,
} from 'sequelize-typescript'
import { User } from '@/modules/user/models/user.model'
import { SensorStatus, SensorType } from '@/modules/sensor/types'

@Table
export class Sensor extends Model<Sensor> {
  @Length({ min: 5, max: 25 })
  @Column({
    type: DataType.STRING,
    allowNull: false  
  })
  name: string

  @Column({ 
    type: DataType.STRING 
  })
  color: string

  @IsIP
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  ip: string

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  mac: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  gpioPin: number

  @Column({
    type: DataType.ENUM(...Object.values(SensorStatus)),
  })
  status: SensorStatus

  @Column({
    type: DataType.ENUM(...Object.values(SensorType)),
    allowNull: false
  })
  type: SensorType

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  @ForeignKey(() => User)
  @Column
  ownerId: number

  @BelongsToMany(() => User, 'SensorMembers', 'sensorId', 'userId')
  members: User[]
}
