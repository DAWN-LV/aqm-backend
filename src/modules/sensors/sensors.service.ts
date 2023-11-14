import { Injectable } from '@nestjs/common';

import data from './sensor.data'

@Injectable()
export class SensorsService {
  findAll(): any {
    return data;
  }
}
