import { Body, Controller, Get, Post } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sensors')
@Controller('sensors')
export class SensorsController {
  constructor(private readonly sensorsService: SensorsService) {}

  @Get()
  findAll(): string {
    return this.sensorsService.findAll();
  }

  @Post()
  createSenson(@Body() dto: any): Promise<void> {
    const data =  {
      ip: dto.ip,
      mac: "00:1A:2B:3C:4D:5E",
      name: dto.name,
      threshold: 800,
      status: "working",
      setup_timing: 1637000000000,
      calculated_data: [
        { value: 111, epoch: 1637000000000 },
        { value: 222, epoch: 1637001000000 },
        { value: 333, epoch: 1637002000000 },
        { value: 444, epoch: 1637003000000 },
        { value: 555, epoch: 1637004000000 },
      ],
      data: [
        { value: 666, epoch: 1637005000000 },
        { value: 777, epoch: 1637006000000 },
        { value: 888, epoch: 1637007000000 },
        { value: 999, epoch: 1637008000000 },
        { value: 123, epoch: 1637009000000 },
        { value: 456, epoch: 1637010000000 },
      ],
    }

    return dto;
  }
}
