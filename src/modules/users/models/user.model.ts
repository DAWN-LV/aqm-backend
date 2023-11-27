import { Model, Column, Table, Default } from "sequelize-typescript"

@Table
export class User extends Model {
  @Column
  username: string

  @Default("https://github.com/DAWN-LV/aqm-backend/blob/master/src/common/images/user/avatar.png?raw=true")
  @Column
  avatar: string 

  @Column
  email: string

  @Column
  password: string
}