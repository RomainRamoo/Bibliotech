import { Module } from '@nestjs/common';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Serie } from './serie.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Serie])],
  controllers: [SeriesController],
  providers: [SeriesService]
})
export class SeriesModule {}
