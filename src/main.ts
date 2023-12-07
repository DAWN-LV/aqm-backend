import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from '@/modules/app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: 'http://' + location.hostname + ':5173' },
  })

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('AQM (Air Quality Monitor) REST API')
    .setVersion('0.1v')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}

bootstrap()
