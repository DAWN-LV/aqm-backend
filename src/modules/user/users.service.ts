import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { User } from '@/modules/user/models/user.model'

@Injectable()
export class UsersService {
  async findOne(userId: number) {
    try {
      const user = User.findOne({ where: { id: userId } })

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      return user
    } catch (error) {
      throw new BadRequestException(`Error finding user: ${ error.message }`)
    }
  }

  async findBy(email: string): Promise<User> {
    try {
      const user = User.findOne({ where: { email } })

      if (!user) {
        throw new NotFoundException(`User with email ${ email } not found`);
      }
  
      return user
    } catch (error) {
      throw new BadRequestException(`Error finding user: ${ error.message }`)
    }
  }

  async create(dto) {
    try {
      dto.password = await this.hashPassword(dto.password)
      return await User.create(dto)
    } catch (error) {
      throw new BadRequestException(`Error creating user: ${ error.message }`)
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }
}
