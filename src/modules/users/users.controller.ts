import { Controller, Patch, Body, UseGuards, Req, Delete } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtGuard } from '../../guards/jwt.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtGuard)
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @Patch()
  updateUser(@Body() dto: UpdateUserDto, @Req() req): Promise<UpdateUserDto> {
    const user = req.user; 
    return this.userService.updateUser(user.email, dto);
  }

  @UseGuards(JwtGuard)
  @ApiResponse({ status: 200, type: Boolean })
  @Delete()
  async deleteUser(@Req() req): Promise<Boolean> {
    const user = req.user;
    return this.userService.deleteUser(user.email);
  }
}