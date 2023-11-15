import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { SensorsModule } from '../sensors/sensors.module';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { User } from '../users/models/user.model';
import { AuthModule } from '../auth/auth.module';
import config from '../../config'

@Module({
  imports: [
    SensorsModule,
    // AuthModule,
    // UsersModule,
    // TokenModule,
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [ config ]
    }),
    // SequelizeModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     dialect: 'postgres',
    //     host: configService.get('db.host'),
    //     port: configService.get('db.port'),
    //     username: configService.get('db.user'),
    //     password: configService.get('db.password'),
    //     // database: configService.get('db.name'),
    //     synchronize: true,
    //     autoLoadModels: true,
    //     models: [User]
    //   })
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
