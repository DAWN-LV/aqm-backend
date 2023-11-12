import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/creare-user.dto';
import { UserResponse } from './response/user.response';
import { TokenService } from '../token/token.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Errors } from '../../common/const/errors';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) {}

  async registerUser(dto: CreateUserDto): Promise<CreateUserDto> {
    const userByEmail = await this.userService.findUserByEmail(dto.email);
    if (userByEmail) {
      throw new BadRequestException(Errors.USER_EXIST_EMAIL);
    }

    // const userByUsername = await this.userService.findUserByUsername(dto.username);
    // if (userByUsername) {
    //   throw new BadRequestException(Errors.USER_EXIST_USERNAME);
    // }

    return this.userService.createUser(dto);
  }

  async loginUser(dto: LoginUserDto): Promise<UserResponse & { token: string }> {
    const userByEmail = await this.userService.findUserByEmail(dto.email);
    if (!userByEmail) {
      throw new BadRequestException(Errors.USER_NOT_EXIST_EMAIL);
    }

    const validPassword = await bcrypt.compare(dto.password, userByEmail.password);
    if (!validPassword) {
      throw new BadRequestException(Errors.WRONG_DATA);
    }

    const userWithoutPassword = await this.userService.findUserByEmailWithExclusion(dto.email, 'password');
    const token = await this.tokenService.generateJwtToken({
      username: userByEmail.username,
      email: userByEmail.email
    });

    return { ...userWithoutPassword, token };
  }
}
