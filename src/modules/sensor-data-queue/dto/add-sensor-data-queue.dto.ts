import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, Min, ValidateNested } from "class-validator"

class SensorDataItem {
    @Min(0)
    @IsNumber()
    @ApiProperty()
    ts: number;
  
    @IsNumber()
    @ApiProperty()
    value: number;
}
  
class SensorData {
    @IsString()
    @ApiProperty()
    type: string;
  
    @IsArray()
    @ApiProperty({ type: SensorDataItem, isArray: true })
    data: Array<SensorDataItem>;
}

class Sensor {
    @ApiProperty({ type: SensorData })
    sensor_id: SensorData
}
  
export class AddSensorDataQueueDto {
    @IsString()
    @ApiProperty()
    mac: string;
  
    @IsString()
    @ApiProperty()
    ip: string;
  
    @ApiProperty({ type: Sensor })
    body: {
        "sensor_id": {
            type: string
            data: Array<SensorDataItem>
        }
    }
}
