import { Point } from '@influxdata/influxdb-client'
import { InfluxdbService } from '../influxdb/influxdb.service'
import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly influxdbService: InfluxdbService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string): Promise<UserDto> {
    return this.influxdbService.findOne('users', { where: { email } })
  }

  async findUserByEmailWithoutPassword(
    email: string,
  ): Promise<Omit<UserDto, 'password'>> {
    return this.influxdbService.findOne('users', {
      where: { email },
      attributes: { exclude: ['password'] },
    })
  }

  async createUser(dto: UserDto): Promise<UserDto> {
    const password = await this.hashPassword(dto.password)
    const point = new Point('users')
      .tag('email', dto.email)
      .stringField('username', dto.username)
      .stringField('password', password)

    await this.influxdbService.write(point)
    return dto
  }

  // async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
  //   await this.userRepository.update(dto, { where: { email } })
  //   return dto
  // }

  // async deleteUser(email: string): Promise<boolean> {
  //   await this.userRepository.destroy({ where: { email } })
  //   return true
  // }
}
