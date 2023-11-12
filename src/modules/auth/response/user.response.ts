import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserResponse {
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