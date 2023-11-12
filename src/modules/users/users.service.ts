import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserDto } from './dto/creare-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserByEmailWithExclusion(email: string, exclude?: string) {
    return this.userRepository.findOne({ where: { email }, attributes: { exclude: [exclude] } });
  }

  async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
    dto.password = await this.hashPassword(dto.password);
    await this.userRepository.create({ ...dto });
    return dto;
  }

  async updateUser(email: string, dto: UpdateUserDto): Promise<UpdateUserDto> {
    await this.userRepository.update(dto, { where: { email } });
    return dto;
  }

  async deleteUser(email: string): Promise<Boolean> {
    await this.userRepository.destroy({ where: { email } });
    return true;
  }
}
