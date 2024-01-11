import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from '@/modules/app/app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { MqttModule } from './modules/sensor/mqtt/mqtt.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*' },
  })

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('AtmoSense REST API')
    .setVersion('0.1v')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)

  const configService: ConfigService = app.get(ConfigService);
  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(MqttModule, {
    transport: Transport.MQTT,
    options: {
      url: configService.get('mqtt.host'),
      port: configService.get('mqtt.port'),
      username: configService.get('mqtt.user'),
      password: configService.get('mqtt.password')
    },
  });

  await mqttApp.listen()
}

bootstrap()
