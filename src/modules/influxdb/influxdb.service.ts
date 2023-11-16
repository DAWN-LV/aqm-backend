import {
  InfluxDB,
  Point,
  QueryApi,
  WriteApi,
} from '@influxdata/influxdb-client'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

interface FindOneParams {
  where: Record<string, string>
  attributes?: {
    exclude: string[]
  }
}

@Injectable()
export class InfluxdbService {
  private client: InfluxDB

  private writeClient: WriteApi
  private queryClient: QueryApi

  constructor(private readonly configService: ConfigService) {
    const { url, token, bucket, org } = configService.get('db')

    this.client = new InfluxDB({ url, token })

    this.writeClient = this.client.getWriteApi(org, bucket, 'ns')
    this.queryClient = this.client.getQueryApi(org)
  }

  async write(points: Point | Point[]): Promise<void> {
    const pointsArray = Array.isArray(points) ? points : [points]
    for (const point of pointsArray) {
      await this.writePoint(point)
    }
  }

  async findOne<T>(
    measurement: string,
    params: FindOneParams,
  ): Promise<T | null> {
    const query = this.createQuery(measurement, params)

    try {
      const res = await this.queryClient.collectRows<T>(query)
      return res.length > 0 ? res[0] : null
    } catch (error) {
      throw error
    }
  }

  private async writePoint(point: Point): Promise<void> {
    try {
      this.writeClient.writePoint(point)
      await this.writeClient.flush()
    } catch (error) {
      throw error
    }
  }

  private createQuery(
    measurement: string,
    { where, attributes }: FindOneParams,
  ): string {
    const conditions = this.createConditions(where)
    const excludeConditions = this.createExcludeConditions(attributes?.exclude)

    const bucket = this.configService.get('db.bucket')

    return `
      from(bucket: "${bucket}")
      |> range(start: 1970-01-01T00:00:00Z)
      |> filter(fn: (r) => r._measurement == "${measurement}")
      |> filter(fn: (r) => ${conditions})
      ${excludeConditions ? `|> drop(columns: [${excludeConditions}])` : ''}
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
      |> limit(n:1)
    `
  }

  private createConditions(conditions: Record<string, string>): string {
    return Object.entries(conditions)
      .map(([key, value]) => `r.${key} == "${value}"`)
      .join(' and ')
  }

  private createExcludeConditions(conditions?: string[]): string | null {
    return conditions
      ? conditions.map((field) => `"${field}"`).join(', ')
      : null
  }
}
