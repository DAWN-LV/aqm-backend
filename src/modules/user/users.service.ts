import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import * as bcrypt from 'bcrypt'

import { User } from '@/modules/user/models/user.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async getUser(id: number) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } })
  }

  async createUser(dto) {
    dto.password = await this.hashPassword(dto.password)
    const user = await this.userRepository.create(dto)
    return user
  }
}
