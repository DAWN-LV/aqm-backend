import { Module } from '@nestjs/common'
import { ClientsModule } from '@nestjs/microservices'
import { MqttService } from '@/modules/mqtt/mqtt.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MqttProvider } from '@/providers/mqtt.provider'

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useClass: MqttProvider
      },
    ]),
  ],
  providers: [MqttService],
  exports: [MqttService]
})
export class MqttModule {}
