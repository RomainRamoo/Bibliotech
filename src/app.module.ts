import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SeriesModule } from './series/series.module';
import { VolumesModule } from './volumes/volumes.module';

@Module({
  imports: [
    // Charge automatiquement ton .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Connexion à PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, // ⚠️ à désactiver en production
      }),
    }),
    UsersModule,
    SeriesModule,
    VolumesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
