import { Controller, Post, Body } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/creare-user.dto';
import { UserResponse } from './response/user.response';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post('register')
  register(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.registerUser(dto);
  }

  @ApiResponse({ status: 200, type: UserResponse })
  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<UserResponse> {
    return this.authService.loginUser(dto);
  }
}
