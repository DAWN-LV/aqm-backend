import { Model, Column, Table } from "sequelize-typescript"

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
}