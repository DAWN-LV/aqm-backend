import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length, Matches } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  @ApiProperty()
  username: string

  @IsEmail()
  @ApiProperty()
  email: string

  @IsString()
  @Length(6, 100)
  @ApiProperty()
  password: string
}
