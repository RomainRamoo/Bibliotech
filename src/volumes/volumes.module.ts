import { Module } from '@nestjs/common';
import { VolumesService } from './volumes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volume } from './volume.entity';
import { Serie } from 'src/series/serie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volume, Serie])],
  providers: [VolumesService]
})
export class VolumesModule {}
