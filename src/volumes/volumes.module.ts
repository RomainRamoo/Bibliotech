import { Module } from '@nestjs/common';
import { VolumesController } from './volumes.controller';
import { VolumesService } from './volumes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Volume } from './volume.entity';
import { Serie } from 'src/series/serie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Volume, Serie])],
  controllers: [VolumesController],
  providers: [VolumesService]
})
export class VolumesModule {}
