import { IsOptional, IsString } from 'class-validator'

export class CreateGroupDTO {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  sensorIds?: string
}
