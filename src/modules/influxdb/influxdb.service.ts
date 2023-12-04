import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InfluxDB } from 'influx'

interface WriteOptions {
  measurement: string,
  tags: Record<string, any>,
  fields: Record<string, any>,
}

@Injectable()
export class InfluxdbService {
    private client: InfluxDB

    constructor() {
      this.client = new InfluxDB({
        host: "aqm-backend-influx-aqm-backend.a.aivencloud.com",
        port: 12528,
        database: "defaultdb",
        username: "avnadmin",
        password: "AVNS_7ZgMx2fVejqDPhIRmD2"
      })
    }

    public write(options: Array<WriteOptions>) {
      return void this.client.writePoints(options)
    }
}
