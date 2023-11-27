import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(user) {
    const payload = { user }
    const { secret, expiresIn } = this.configService.get('jwt')
    const token = this.jwtService.sign(payload, { secret, expiresIn })
    return { token, expiresAt: Date.now() + (expiresIn * 1000) }
  }
}
