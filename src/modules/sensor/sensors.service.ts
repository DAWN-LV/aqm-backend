import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Sensor } from '@/modules/sensor/models/sensor.model'
import { User } from '@/modules/user/models/user.model'

import { CreateSensorDTO } from '@/modules/sensor/dto/create-sensor.dto'
import { UserSensorRef } from '@/modules/sensor/models/user-sensor-ref.model'

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Sensor) private readonly sensorRepository: typeof Sensor,
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(UserSensorRef) private readonly userSensorRefRepository: typeof UserSensorRef,
  ) {}

  findAll(userId: number) {
    try {
      return this.sensorRepository.findAll({
        include: [{
          model: User,
          where: { id: userId },
          attributes: [],
        }]
      })
    } catch (error) {
      throw new BadRequestException(`Error finding sensors: ${error.message}`)
    }
  }

  async deleteSensor(userId: number, sensorId: number) {
    try {
      const existingRef = await this.findUserSensorRef(userId, sensorId)
      if (!existingRef) {
        throw new Error('The link between user and sensor does not exist.')
      }

      await this.deleteUserSensorRef(userId, sensorId)

      return true
    } catch (error) {
      throw new BadRequestException(`Error in deleting sensor link: ${error.message}`)
    }
  }

  // TODO
  async updateSensor() {}

  async createSensor(dto: CreateSensorDTO, userId: number) {
    try {
      const existingSensor = await this.findSensor({ ip: dto.ip })
      if (existingSensor) {
        const existingRef = await this.findUserSensorRef(
          userId,
          existingSensor.id,
        )
        if (existingRef) {
          throw new Error('This sensor is already linked to the user.')
        }

        await this.createUserSensorRef(userId, existingSensor.id)
        return existingSensor
      } else {
        const newSensor = await this.sensorRepository.create({ ...dto })
        await this.createUserSensorRef(userId, newSensor.id)
        return newSensor
      }
    } catch (error) {
      throw new BadRequestException(`Error creating sensor: ${error.message}`)
    }
  }

  private async findUserSensorRef(userId: number, sensorId: number) {
    return await this.userSensorRefRepository.findOne({
      where: { userId, sensorId },
    })
  }

  private async createUserSensorRef(userId: number, sensorId: number) {
    return await this.userSensorRefRepository.create({ userId, sensorId })
  }

  private async deleteUserSensorRef(userId: number, sensorId: number) {
    return await this.userSensorRefRepository.destroy({
      where: { userId, sensorId },
    })
  }

  private async findSensor({ ...dto }) {
    return await this.sensorRepository.findOne({ where: { ...dto } })
  }
}
