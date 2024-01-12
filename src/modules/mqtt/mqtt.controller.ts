import { Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices'
import { BadRequestException, Controller } from '@nestjs/common'
import { Sensor } from '@/modules/sensor/models/sensor.model'
import { SensorGateway } from '@/modules/sensor/gateways/sensor.gateway'

@Controller()
export class MqttController {
  constructor(
    private readonly sensorGateway: SensorGateway,
  ) {}

  @MessagePattern('sensor/+/meta')
  async handleSensorClientMeta(@Payload() message: string, @Ctx() context: MqttContext) {
    const mac = context.getTopic().split('/')[1]
    const data = message.split('|')

    // const platform = data[0]
    // const endpoint = data[1]
    const status: any = data[2]
    // const ipLocal = data[3]
    const ipExternal = data[4]
    
    try {
      const sensor = await Sensor.findOne({ where: { mac: mac } })
      const ip = ipExternal === 'None' ? ipExternal : sensor.ip

      if (sensor) {
        await sensor.update({ ip, status: status })
        this.sensorGateway.update({ id: sensor.id })
      }
    } catch (error) {
      throw new BadRequestException(`Mqtt Error: ${ error.message }`)
    }
  }
}
