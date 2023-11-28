import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { TokenService } from '../token/token.service'
import { LoginUserDto } from './dto/login-user.dto'
import { Errors } from '../../common/const/errors'
import { UserDto } from '../users/dto/user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUser(dto: UserDto) {
    const userByEmail = await this.userService.findUserByEmail(dto.email)
    if (userByEmail) {
      throw new BadRequestException(Errors.USER_EXIST_EMAIL)
    }

    const user = await this.userService.createUser(dto)

    const { token, expiresAt } = await this.tokenService.generateJwtToken({
      id: user.id,
      username: user.username,
      email: user.email
    })

    return { token, expiresAt }
  }

  async login(dto: LoginUserDto) {
    const userByEmail = await this.userService.findUserByEmail(dto.email)
    if (!userByEmail) {
      throw new BadRequestException(Errors.USER_NOT_EXIST_EMAIL)
    }

    const isValidPassword = await bcrypt.compare(dto.password, userByEmail.password)
    if (!isValidPassword) {
      throw new BadRequestException(Errors.WRONG_DATA)
    }

    const { token, expiresAt } = await this.tokenService.generateJwtToken({
      id: userByEmail.id,
      username: userByEmail.username,
      email: userByEmail.email
    })

    return { token, expiresAt }
  } 
}
