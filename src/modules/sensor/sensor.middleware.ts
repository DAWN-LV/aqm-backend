import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { HttpService } from '@/modules/http/http.service'

@Injectable()
export class SensorMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { ip } = req.body

    const endpoint_url = 'http://' + location.hostname + '/api/sensor-queue'
    const platform = 'test_linux'

    try {
      const data = await this.init(ip, { endpoint_url, platform })
      if (!data) {
        throw new Error('Failed to connect to the sensor')
      }

      req["sensor"] = data
    } catch (error) {
      throw new BadRequestException('Failed to connect to the sensor')
    }

    next()
  }

  private init(ip: string, data?: any) {
    return this.httpService.post(('http://' + ip + ':8000/api/init'), data)
  }
}