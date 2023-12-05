import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { HttpService } from '@/modules/http/http.service'

@Injectable()
export class SensorMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { ip } = req.body

    const endpoint_url = "http://40.68.14.121:3000/api"
    const platform = "test_linux"
    
    console.log("IP: " + ip)

    try {
      const data = await this.getSensorData(ip, { endpoint_url, platform })
      if (!data) {
        throw new Error('Failed to connect to the sensor')
      }

      req.body.sensorData = data
    } catch (error) {
      throw new BadRequestException('Failed to connect to the sensor')
    }

    next()
  }

  private getSensorData(ip: string, data?: any) {
    return this.httpService.post(('http://' + ip + ':8000'), data)
  }
}