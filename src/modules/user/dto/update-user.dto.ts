import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @Length(3, 50)
  @ApiProperty()
  username: string
}
