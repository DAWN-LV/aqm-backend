import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ClientProxy, MqttRecord } from '@nestjs/microservices';

@Injectable()
export class MqttService {
    constructor(
        @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy
    ) {}

    public publish<T>(topic: string, message: string) {
        try {
            console.log(`[MqttService][publish] topic=${topic} message=${message}`)

            return this.mqttClient.emit(topic, message)
        } catch (error) {
            throw new BadRequestException(`Error mqtt publish: ${error.message}`)
        }
    }
}
