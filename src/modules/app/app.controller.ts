import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { InfluxdbService } from '../influxdb/influxdb.service'
import QueryBuilder from '../influxdb/builders/QueryBuilder'

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
    await this.influxService.write([{ measurement: "abc", fields: { value: 1 }, tags: { mac: "test" } }])

    const query = new QueryBuilder()
      .select(["abc"])
      .limit(1)
      .build()

    const a = await this.influxService.read(query)
    console.log(a)

    return "WORK"
  }
}
