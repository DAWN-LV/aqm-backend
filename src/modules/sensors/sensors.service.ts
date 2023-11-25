import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateSensorDTO } from './dto/create-sensor.dto'
import { Sensor } from './models/sensor.model'

@Injectable()
export class SensorsService {
  constructor(@InjectModel(Sensor) private readonly sensorRepository: typeof Sensor) {}

  async findAll() {
    return await this.sensorRepository.findAll()
  }

  async createSensor(dto: CreateSensorDTO) {
    try {
      return await this.sensorRepository.create({ ...dto })
    } catch (error) {
      console.log(error)
    }
  }
}
