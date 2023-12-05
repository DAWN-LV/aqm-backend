import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UsersService } from '@/modules/user/users.service'
import { TokenService } from '@/modules/token/token.service'

import { LoginUserDto } from '@/modules/auth/dto/login-user.dto'
import { UserDto } from '@/modules/user/dto/user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: UserDto) {
    const userByEmail = await this.userService.findUserByEmail(dto.email)
    if (userByEmail) {
      throw new BadRequestException('A user with this email already exists')
    }

    const user = await this.userService.createUser(dto)

    const { token, expiresAt } = await this.tokenService.generateJwtToken({
      id: user.id,
      username: user.username,
      email: user.email,
    })

    return { token, expiresAt }
  }

  async login(dto: LoginUserDto) {
    const userByEmail = await this.userService.findUserByEmail(dto.email)
    if (!userByEmail) {
      throw new BadRequestException('No user found with this email')
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      userByEmail.password,
    )
    if (!isValidPassword) {
      throw new BadRequestException('Invalid login credentials')
    }

    const { token, expiresAt } = await this.tokenService.generateJwtToken({
      id: userByEmail.id,
      username: userByEmail.username,
      email: userByEmail.email,
    })

    return { token, expiresAt }
  }
}
