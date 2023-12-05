import {
  Controller,
  Body,
  UseGuards,
  Req,
  Get,
  Post,
} from '@nestjs/common'
import { JwtGuard } from '@/guards/jwt.guard'
import { ApiTags } from '@nestjs/swagger'

import { UsersService } from '@/modules/user/users.service'
import { UserDto } from '@/modules/user/dto/user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getUser(@Req() { user }) {
    return this.userService.getUser(user.id)
  }

  @Post()
  createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto)
  }
}
