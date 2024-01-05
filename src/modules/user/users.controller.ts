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
import { CreateUserDto } from '@/modules/user/dto/create-user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findOne(@Req() { user }) {
    return this.userService.findOne(user.id)
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto)
  }
}
