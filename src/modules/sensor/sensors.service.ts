import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { Sensor } from '@/modules/sensor/models/sensor.model'
import { User } from '@/modules/user/models/user.model'

import { SensorGateway } from '@/modules/sensor/gateways/sensor.gateway'
import { UserSensorRef } from '@/modules/sensor/models/user-sensor-ref.model'
import { CreateSensorDTO } from '@/modules/sensor/dto/create-sensor.dto'
import { UpdateSensorDTO } from '@/modules/sensor/dto/update-sensor.dto'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Sensor) private readonly sensorRepository: typeof Sensor,
    @InjectModel(UserSensorRef) private readonly userSensorRefRepository: typeof UserSensorRef,
    private readonly sensorGateway: SensorGateway,
    private readonly influxdbService: InfluxdbService
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

  async findOne(id: number): Promise<Sensor> {
    try {
      const sensor = await this.sensorRepository.findByPk(id)

      if (!sensor) {
        throw new Error('Sensor not found.')
      }

      return sensor
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

  async updateSensor(userId: number, sensorId: number, dto: UpdateSensorDTO): Promise<Sensor> {
    try {
      const ref = await this.userSensorRefRepository.findOne({
        where: { userId, sensorId }
      })
  
      if (!ref) {
        throw new Error('The link between user and sensor does not exist.')
      }
  
      const sensor = await this.sensorRepository.findByPk(sensorId)
      if (!sensor) {
        throw new Error('Sensor not found.')
      }

      await sensor.update(dto)

      this.sensorGateway.updateSensor(sensor.id)
  
      return sensor
    } catch (error) {
      throw new BadRequestException(`Error updating sensor: ${ error.message }`)
    }
  }

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

  async getSensorData(user_id: number, sensor_id: number, agg: string, from: number, to: number) {
    // console.log('user_id = ', user_id)
    // console.log('sensor_id = ', sensor_id)
    // console.log('agg = ', agg)
    // console.log('from = ', from)
    // console.log('to = ', to)

    // https://docs.influxdata.com/influxdb/cloud/query-data/influxql/explore-data/time-and-timezone/#time-syntax - duration_literals => add validation
    // from + to => add validation
    // have to handel sql injection
    const query = `
      select
        mean(value) as avg,
        min(value) as min,
        max(value) as max
      from test 
      where time > now() - ${from}s
        and time < now() - ${to}s
      group by time(${agg})
      fill(none)
      order by time desc
      limit 5
    `
    const dbres: any = await this.influxdbService.read(query, true)

    // transformation
    dbres.results[0].series[0].values.forEach(el => {
      console.log(el)
      el[0] = new Date(el[0]).getTime() / 1000
      el[1] = parseFloat( (el[1]).toFixed(2) )
    })

    return dbres
  }
}
