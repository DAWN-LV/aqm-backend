import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from '@/modules/auth/auth.service'

import { LoginUserDto } from '@/modules/auth/dto/login-user.dto'
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto)
  }

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto)
  }
}
