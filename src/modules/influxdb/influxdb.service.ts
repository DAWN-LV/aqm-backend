import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InfluxDB, IPoint, IWriteOptions } from 'influx'
import { testDataSchema } from './schema/influxdb.schema'

@Injectable()
export class InfluxdbService {
  private client: InfluxDB

  constructor(private readonly configService: ConfigService) {
    this.client = new InfluxDB({
      host: this.configService.get('db.influx.host'),
      port: this.configService.get('db.influx.port'),
      protocol: this.configService.get('db.influx.protocol'),
      database: this.configService.get('db.influx.database'),
      username: this.configService.get('db.influx.username'),
      password: this.configService.get('db.influx.password'),
      schema: [
        testDataSchema
      ],
    })
  }

  public write(points: Array<IPoint>, options?: IWriteOptions) {
    try {
      return this.client.writePoints(points, options)
    } catch (error) {
      throw new BadRequestException(`InfluxDB Error: ${error}`)
    }
  }

  public read(query: string) {
    try {
      return this.client.query(query)
    } catch (error) {
      throw new BadRequestException(`InfluxDB Error: ${error}`)
    }
  }
}
