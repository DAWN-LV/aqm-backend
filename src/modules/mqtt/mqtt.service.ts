import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

@Injectable()
export class MqttService {
    constructor(
        @Inject('MQTT_SERVICE') private readonly client: ClientProxy
    ) {}

    public emit<T>(topic: string, message: string) {
        try {
            console.log(`[MqttService][emit] topic=${topic} message=${message}`)

            return this.client.emit(topic, message)
        } catch (error) {
            throw new BadRequestException(`Error mqtt emit: ${error.message}`)
        }
    }
}
