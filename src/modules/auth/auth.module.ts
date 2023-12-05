import { Module } from '@nestjs/common'

import { UsersModule } from '@/modules/user/users.module'
import { TokenModule } from '@/modules/token/token.module'

import { AuthService } from '@/modules/auth/auth.service'
import { AuthController } from '@/modules/auth/auth.controller'

import { JwtStrategy } from '@/passport/jwt.strategy'

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
