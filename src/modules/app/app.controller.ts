import { Controller, Get } from '@nestjs/common'
import { AppService } from '@/modules/app/app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('ping')
  ping(): string {
    return this.appService.ping()
  }
}
