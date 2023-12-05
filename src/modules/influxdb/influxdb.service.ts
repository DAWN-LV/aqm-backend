import { BadRequestException, Injectable } from '@nestjs/common'
import { InfluxDB, IPoint, IWriteOptions } from 'influx'
import { ConfigService } from '@nestjs/config'

import testSchema from '@/modules/influxdb/schema/test.schema'

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
      schema: [testSchema],
    })

    this.client.ping(5_000).then(hosts => {
      hosts.forEach(host => {
        if (host.online) {
          console.log(`${host.url.host} responded in ${host.rtt}ms running ${host.version})`)
        } else {
          console.log(`${host.url.host} is offline :(`)
        }
      })
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
