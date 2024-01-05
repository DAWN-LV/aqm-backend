import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Req, 
  UseGuards 
} from '@nestjs/common'

import { CreateGroupDTO } from '@/modules/group/dto/create-group.dto'
import { UpdateGroupDTO } from '@/modules/group/dto/update-group.dto'
import { GroupService } from '@/modules/group/group.service'
import { JwtGuard } from '@/guards/jwt.guard'

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() { user }) {
    return this.groupService.findAll(user.id)
  }

  @UseGuards(JwtGuard)
  @Get(':groupId')
  findOne(@Param('groupId') groupId: number) {
    return this.groupService.findOne(groupId)
  }

  @UseGuards(JwtGuard)
  @Post()
  createGroup(@Body() dto: CreateGroupDTO, @Req() { user }) {
    return this.groupService.create(user.id, dto)
  }

  @UseGuards(JwtGuard)
  @Delete(':groupId')
  deleteSensor(@Param('groupId') groupId: number, @Req() { user }) {
    return this.groupService.delete(user.id, groupId)
  }

  @UseGuards(JwtGuard)
  @Patch(':groupId')
  updateGroup(
    @Param('groupId') groupId: number,
    @Body() dto: UpdateGroupDTO, 
    @Req() { user }
  ) {
    return this.groupService.update(user.id, groupId, dto)
  }
}
