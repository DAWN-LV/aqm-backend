import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}