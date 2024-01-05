import {
  Model,
  Column,
  Table,
  Unique,
  AllowNull,
  Length,
  DataType,
  IsEmail,
} from 'sequelize-typescript'

@Table
export class User extends Model<User> {
  @Unique
  @AllowNull(false)
  @Length({ min: 3, max: 50 })
  @Column({
    type: DataType.STRING,
  })
  username: string

  @Column({
    type: DataType.STRING,
  })
  avatar: string

  @Unique
  @AllowNull(false)
  @IsEmail
  @Column({
    type: DataType.STRING,
  })
  email: string

  @AllowNull(false)
  @Length({ min: 6 })
  @Column({
    type: DataType.STRING,
  })
  password: string
}
