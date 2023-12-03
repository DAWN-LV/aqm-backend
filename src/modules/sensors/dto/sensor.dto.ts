import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SensorDTO {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  ip: string
}
