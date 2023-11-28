import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateSensorDTO } from './dto/create-sensor.dto'
import { Sensor } from './models/sensor.model'

@Injectable()
export class SensorsService {
  constructor(@InjectModel(Sensor) private readonly sensorRepository: typeof Sensor) {}

  async findAll(userId: number) {
    try {
      return await this.sensorRepository.findAll({ where: { userId } })
    } catch (error) {

    }
  }

  async createSensor(dto: CreateSensorDTO, userId: number) {
    try {
      return await this.sensorRepository.create({ ...dto, userId })
    } catch (error) {
      
    }
  }
}
