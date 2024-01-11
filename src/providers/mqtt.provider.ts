import { ClientsModuleOptionsFactory, ClientProvider, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MqttProvider implements ClientsModuleOptionsFactory {
	constructor(private readonly configService: ConfigService) { }

	createClientOptions(): ClientProvider | Promise<ClientProvider> {
		return {
			transport: Transport.MQTT,
			options: {
				url: this.configService.get('mqtt.host'),
				port: this.configService.get('mqtt.port'),
				username: this.configService.get('mqtt.user'),
				password: this.configService.get('mqtt.password')
			}
		}
	}
}
