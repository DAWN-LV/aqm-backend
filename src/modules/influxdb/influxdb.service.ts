import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InfluxDB, FieldType, IPoint } from 'influx'

@Injectable()
export class InfluxdbService {
    private client: InfluxDB

    constructor() {
      this.client = new InfluxDB({
        host: "aqm-backend-influx-aqm-backend.a.aivencloud.com",
        port: 12528,
        database: "sensor_data",
        username: "avnadmin",
        protocol: "https",
        password: "AVNS_7ZgMx2fVejqDPhIRmD2",
        schema: [
          {
            measurement: "abc",
            fields: { value: FieldType.FLOAT },
            tags: [ "mac" ],
          }
        ]
      })
    }

    public write(options: Array<IPoint>) {
      try {
        return this.client.writePoints(options)
      } catch (error) {
        throw new BadRequestException(`InfluxDB Error: ${ error }`)
      } 
    }

    public read(query: string) {
      try {
        return this.client.query(query)
      } catch (error) {
        throw new BadRequestException(`InfluxDB Error: ${ error }`)
      } 
    }
}
