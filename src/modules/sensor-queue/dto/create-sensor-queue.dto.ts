import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsNumber,
  IsString,
  Min,
} from 'class-validator'

export class SensorMeasurementDTO {
  @Min(0)
  @IsNumber()
  @ApiProperty()
  ts: number

  @IsNumber()
  @ApiProperty()
  value: number
}

export class SensorDataDTO {
  @IsString()
  @ApiProperty()
  type: string

  @IsArray()
  @ApiProperty({ type: SensorMeasurementDTO, isArray: true })
  data: Array<SensorMeasurementDTO>
}

export class CreateSensorQueueDTO {
  @IsString()
  @ApiProperty()
  mac: string

  @IsString()
  @ApiProperty()
  ip: string

  @ApiProperty({ type: SensorDataDTO, isArray: true })
  body: SensorDataDTO[]
}
