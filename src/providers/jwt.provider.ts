import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt'

@Injectable()
export class JWTProvider implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      global: true,
      secret: this.configService.get('jwt.secret'),
      signOptions: { 
        expiresIn: this.configService.get('jwt.expiresIn') 
      },
    }
  }
}