import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UsersController } from '@/modules/user/users.controller'
import { UsersService } from '@/modules/user/users.service'
import { User } from '@/modules/user/models/user.model'

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
