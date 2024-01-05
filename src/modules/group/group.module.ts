import { Module } from '@nestjs/common'

import { GroupService } from '@/modules/group/group.service'
import { GroupController } from '@/modules/group/group.controller'
import { GroupGateway } from '@/modules/group/gateways/group.gateway'

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupGateway],
  exports: [GroupService]
})
export class GroupModule {}
