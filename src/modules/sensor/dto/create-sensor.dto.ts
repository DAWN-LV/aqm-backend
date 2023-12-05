import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateSensorDTO {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @ApiProperty()
  ip: string
}
