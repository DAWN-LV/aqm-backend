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

  async findAllBy(userId: number): Promise<Sensor[]> {
    try {
      return await this.sensorRepository.findAll({
        include: [{
          model: User,
          where: { id: userId },
          attributes: [],
        }]
      })
    } catch (error) {
      throw new BadRequestException(`Error in finding sensor link: ${ error.message }`)
    }
  }

  async deleteSensor(userId: number, sensorId: number): Promise<boolean> {
    try {
      const ref = await this.userSensorRefRepository.findOne({ where: { userId, sensorId } })

      if (!ref) {
        throw new Error('The link between user and sensor does not exist.')
      }

      await ref.destroy()
      return true
    } catch (error) {
      throw new BadRequestException(`Error in deleting sensor link: ${ error.message }`)
    }
  }

  // TODO
  async updateSensor() {}

  async createSensor(userId: number, { ip, name, mac }: CreateSensorDTO & { mac: string }): Promise<Sensor> {
    try {
      const [ instance, wasCreated ] = await this.sensorRepository.findOrCreate({
        where: { ip },
        defaults: { ip, name, mac }
      })

      if (wasCreated) {
        await this.userSensorRefRepository.create({ userId, sensorId: instance.id })
        return instance
      }

      const ref = await this.userSensorRefRepository.findOne({
        where: { userId, sensorId: instance.id }
      })

      if (ref) {
        throw new Error('This sensor is already linked to the user.')
      }

      await this.userSensorRefRepository.create({ userId, sensorId: instance.id })
      return instance
    } catch (error) {
      throw new BadRequestException(`Error creating sensor: ${error.message}`)
    }
  }
}
