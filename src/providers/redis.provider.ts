import { BullRootModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class RedisProvider implements SharedBullConfigurationFactory {
  constructor(private readonly configService: ConfigService) {}

  createSharedConfiguration(): BullRootModuleOptions {
    return {
      redis: {
        host: this.configService.get('db.redis.host'),
        port: this.configService.get('db.redis.port'),
        username: this.configService.get('db.redis.user'),
        password: this.configService.get('db.redis.password'),
      },
    }
  }
}
