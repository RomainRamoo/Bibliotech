import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './serie.entity';
import { Volume } from 'src/volumes/volume.entity';
import { VolumesService } from 'src/volumes/volumes.service';

@Module({
  imports:[TypeOrmModule.forFeature([Serie, Volume])],
  controllers: [SeriesController],
  providers: [
    SeriesService,
    VolumesService

  ]
})
export class SeriesModule {}
