import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { SensorsModule } from '../sensors/sensors.module'
import { AppService } from './app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from '../users/users.module'
import { TokenModule } from '../token/token.module'
import { AuthModule } from '../auth/auth.module'
import config from '../../config'

@Module({
  imports: [
    SensorsModule,
    UsersModule,
    AuthModule,
    TokenModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
