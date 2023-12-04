import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { InfluxdbService } from '../influxdb/influxdb.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly influxService: InfluxdbService,
  ) {}

  @Get("ping")
  ping(): string {
    return this.appService.ping()
  }

  @Get("test-influx")
  async testInflux() {
    const query =  `
      select * from test where time > now() - 1h;
    `

    const a = await this.influxService.read(query)
    console.log(a)
    console.log(a.length)

    return "WORK"
  }
}
