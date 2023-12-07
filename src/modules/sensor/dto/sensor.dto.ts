import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class SensorDTO {
  @MaxLength(25)
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  ip: string
}
