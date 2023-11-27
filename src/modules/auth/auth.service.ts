import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { UserResponse } from './response/user.response'
import { TokenService } from '../token/token.service'
import { LoginUserDto } from './dto/login-user.dto'
import { Errors } from '../../common/const/errors'
import { UserDto } from '../users/dto/user.dto'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService
  ) {}

  // async registerUser(dto: UserDto): Promise<UserDto> {
  //   const userByEmail = await this.userService.findUserByEmail(dto.email)
  //   if (userByEmail) {
  //     throw new BadRequestException(Errors.USER_EXIST_EMAIL)
  //   }

  //   return this.userService.createUser(dto)
  // }

  // userId, token, expiresIn 

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

  // async loginUser(dto: LoginUserDto): Promise<UserResponse> {
  //   const userByEmail = await this.userService.findUserByEmail(dto.email)
  //   console.log(userByEmail)
  //   if (!userByEmail) {
  //     throw new BadRequestException(Errors.USER_NOT_EXIST_EMAIL)
  //   }

  //   const validPassword = await bcrypt.compare(
  //     dto.password,
  //     userByEmail.password,
  //   )
  //   if (!validPassword) {
  //     throw new BadRequestException(Errors.WRONG_DATA)
  //   }

  //   const userWithoutPassword =
  //     await this.userService.findUserByEmailWithoutPassword(dto.email)
  //   const token = await this.tokenService.generateJwtToken({
  //     username: userByEmail.username,
  //     email: userByEmail.email,
  //   })

  //   return { ...userWithoutPassword, token }
  // }
}
