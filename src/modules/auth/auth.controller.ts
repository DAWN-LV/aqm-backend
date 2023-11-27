import { Controller, Post, Body } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserResponse } from './response/user.response'
import { LoginUserDto } from './dto/login-user.dto'
import { UserDto } from '../users/dto/user.dto'
import { AuthService } from './auth.service'

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @ApiResponse({ status: 201, type: UserDto })
  @Post('register')
  register(@Body() dto: UserDto): Promise<UserDto> {
    return this.authService.registerUser(dto)
  }

  // @ApiResponse({ status: 200, type: UserResponse })
  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto)
  }
}
