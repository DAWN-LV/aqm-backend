import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateSensorDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string
}
