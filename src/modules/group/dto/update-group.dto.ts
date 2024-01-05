import { IsOptional, IsString } from 'class-validator'

export class UpdateGroupDTO {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  sensorIds?: string
}
