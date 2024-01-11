import { IsMACAddress, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { SensorType } from '@/modules/sensor/types'
import { Transform } from 'class-transformer'

export class CreateSensorDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsString()
  @IsMACAddress()
  @ApiProperty()
  mac: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  color?: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: SensorType

  @IsNumber({}, { message: 'gpioPin must be a number' })
  @Transform(({ value }) => parseInt(value, 10))
  @ApiProperty()
  gpioPin: number
}
