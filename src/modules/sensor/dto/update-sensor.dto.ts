import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class UpdateSensorDTO {
  @MaxLength(25)
  @IsString()
  @ApiProperty()
  name: string
}
