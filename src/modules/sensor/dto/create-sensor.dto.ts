import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class CreateSensorDTO {
  @MaxLength(25)
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  ip: string
}
