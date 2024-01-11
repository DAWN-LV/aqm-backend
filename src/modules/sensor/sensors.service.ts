import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Sensor } from '@/modules/sensor/models/sensor.model'
import { User } from '@/modules/user/models/user.model'

import { SensorGateway } from '@/modules/sensor/gateways/sensor.gateway'
import { CreateSensorDTO } from '@/modules/sensor/dto/create-sensor.dto'
import { UpdateSensorDTO } from '@/modules/sensor/dto/update-sensor.dto'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'
import { MqttRecordBuilder } from '@nestjs/microservices'
import { MqttService } from '@/modules/mqtt/mqtt.service'

import templates from '@/modules/sensor/static/templates.data'

@Injectable()
export class SensorsService {
  constructor(
    private readonly sensorGateway: SensorGateway,
    private readonly influxdbService: InfluxdbService,
    private readonly mqttService: MqttService
  ) {}
  
  getTemplates() {
    try {
      return templates
    } catch (error) {
      throw new BadRequestException(`Error in getting templates: ${ error.message }`)
    }
  }
  
  async findAll(userId: number): Promise<Sensor[]> {
    try {
      return await Sensor.findAll({
        include: [{
          model: User,
          as: 'members',
          attributes: [], 
          where: { id: userId }
        }]
      })
    } catch (error) {
      throw new BadRequestException(`Error in finding sensor link: ${ error.message }`)
    }
  }

  async findOne(sensorId: number): Promise<Sensor> {
    try {
      const sensor = await Sensor.findByPk(sensorId)
  
      if (!sensor) {
        throw new NotFoundException(`Sensor with ID ${ sensorId } not found`)
      }
  
      return sensor
    } catch (error) {
      throw new BadRequestException(`Error in finding sensor link: ${ error.message }`)
    }
  }

  async delete(userId: number, sensorId: number): Promise<boolean> {
    try {
      const sensor = await Sensor.findByPk(sensorId, {
        include: [{ model: User, as: 'members' }]
      })

      if (!sensor) {
        throw new NotFoundException('Sensor not found')
      }

      if (sensor.ownerId !== userId) {
        throw new UnauthorizedException('You are not authorized to delete this sensor')
      }
      
      await sensor.$remove('members', userId)
      this.sensorGateway.delete(String(userId), { id: sensor.id })

      const membersCount = await sensor.$count('members')
      if (membersCount <= 0) {
        this.deinit(sensor.mac)
      }

      return true
    } catch (error) {
      throw new BadRequestException(`Error in deleting sensor link: ${ error.message }`)
    }
  }

  async update(userId: number, sensorId: number, dto: UpdateSensorDTO): Promise<Sensor> {
    try {
      const sensor = await this.findOne(sensorId)
      if (!sensor) {
        throw new NotFoundException('Sensor not found')
      }

      if (sensor.ownerId !== userId) {
        throw new UnauthorizedException('You are not the owner of this sensor')
      }

      await sensor.update({ ...dto })
      this.sensorGateway.update(String(userId), { id: sensor.id })

      return sensor
    } catch (error) {
      throw new BadRequestException(`Error updating sensor: ${ error.message }`)
    }
  }

  async create(userId: number, dto: CreateSensorDTO): Promise<Sensor> {
    try {
      await this.init(dto.mac)
  
      const sensor = await Sensor.findOne({ where: { mac: dto.mac } })
      if (sensor) {
        if (sensor.ownerId !== userId) {
          throw new UnauthorizedException('You are not the owner of this sensor')
        }

        await sensor.$add('members', userId)

        const newSensor = await sensor.update({ ...dto })
        if (newSensor) {
          this.sensorGateway.create(String(userId), { id: sensor.id })
        }

        return newSensor
      }
      
      const newSensor = await Sensor.create({ ownerId: userId, ...dto })
      await newSensor.$add('members', userId)

      return newSensor
    } catch (error) {
      throw new BadRequestException(`Error creating sensor: ${ error.message }`)
    }
  }

  async getData(userId: number, sensorId: number, from: number, to: number) {
    try {
      const sensor = await this.findOne(sensorId)
      if (sensor.ownerId !== userId) {
        throw new UnauthorizedException('You are not the owner of this sensor')
      }

      const now = Date.now() / 1000
      const aggregation = this.getAggregation(now - from, now - to)

      const query = `
        select
          mean(value) as avg,
          min(value) as min,
          max(value) as max
        from test 
        where mac = '${sensor.dataValues.mac}'
          and time > now() - ${from}s
          and time < now() - ${to}s
        group by time(${aggregation})
        fill(none)
        order by time desc
      `
      const res = await this.influxdbService.read<{ time: string, avg: string, min: number, max: number }>(query, false)

      return res.map(data => ([
        new Date(data.time).getTime(),
        parseFloat(data.avg).toFixed(2),
        data.min,
        data.max
      ]))
    } catch (error) {
      throw new BadRequestException(`Error get sensor data: ${error.message}`)
    }
  }

  private getAggregation(from: number, to: number) {
    const diff = to - from
    
    switch (true) {
      case diff < 86400: return '1m'
      case diff < 604800: return '5m'
      case diff < 2592000: return '20m'
      case diff < 15552000: return '1h'
      default: return '1d'
    }
  }

  private async init(mac: string) {
    const record = new MqttRecordBuilder()
      .setData('http://51.124.188.239:3000/api/sensor-queue|test_windows')
      .build()

    this.mqttService.emit(`sensor/${mac}/init`, record.data)
  }
  
  private async deinit(mac: string) {
    this.mqttService.emit(`sensor/${mac}/deinit`, 'deinit')
  }
}
