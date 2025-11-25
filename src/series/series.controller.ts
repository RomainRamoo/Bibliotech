import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Serie } from './serie.entity';
import { VolumesService } from 'src/volumes/volumes.service';
import { CreateVolumeDto } from 'src/models/create-volume.dto';
import { CreateSerieDto } from 'src/models/create-serie.dto';

@Controller('series')
export class SeriesController {
    constructor(
        private readonly seriesService: SeriesService,
        private readonly volumesService: VolumesService
    ) {}

    @Get()
    async getAllSeries() {
        const data = await this.seriesService.getAllSeries();

        return data;
    }

    @Get(":id")
    async getOneSerie(@Param('id') id: number) {
        const data = await this.seriesService.getOneSerie(id);
    
        return data;
    }

    @Post()
    async createSerie(@Body() dto: CreateSerieDto) {
        const userId = 1;
        const data = await this.seriesService.createSerie(dto, userId);
        
        return data;
    }

    @Get(':id/volumes')
    getVolumes(@Param('id') id: string) {
        return this.volumesService.getVolumesBySerie(+id);
    }

    @Post(':id/volumes')
    addVolumeToSerie(
        @Param('id') id: string,
        @Body() dto: CreateVolumeDto
    ) {
        return this.volumesService.addNewVolume(dto, +id)
    }

    @Delete(':seriesId/volumes/:volumeId')
        async deleteOneVolume(
            @Param('seriesId') seriesId: number,
            @Param('volumeId') volumeId: number
    )  {
            return this.volumesService.deleteOneVolume(seriesId,volumeId);
    }
        
}
