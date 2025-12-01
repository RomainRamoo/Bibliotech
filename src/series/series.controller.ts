import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SeriesService } from './series.service';
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
    };

    @Get(":id")
    async getOneSerie(@Param('id', ParseIntPipe) id: number) {
        const data = await this.seriesService.getOneSerie(id);
    
        return data;
    };

    @Post()
    async createSerie(@Body() dto: CreateSerieDto) {
        const userId = 1;
        const data = await this.seriesService.createSerie(dto, userId);
        
        return data;
    };

    @Put(':id')
    async updateOneSerie(
        @Param('id', ParseIntPipe) id:string,
        @Body() dto: CreateSerieDto,
    ) {
        const seriesId = Number(id);
        return this.seriesService.updateOneSerie(seriesId, dto);
    };

    @Get(':id/volumes')
    getVolumes(
        @Param('id', ParseIntPipe) id: string) {
        return this.volumesService.getVolumesBySerie(+id);
    };

    @Post(':id/volumes')
    addVolumeToSerie(
        @Param('id', ParseIntPipe) id: string,
        @Body() dto: CreateVolumeDto
    ) {
        return this.volumesService.addNewVolume(dto, +id)
    };

    @Delete(':seriesId/volumes/:volumeId')
        async deleteOneVolume(
            @Param('seriesId', ParseIntPipe) seriesId: number,
            @Param('volumeId', ParseIntPipe) volumeId: number
    )  {
            return this.volumesService.deleteOneVolume(seriesId,volumeId);
    };

    @Put(':seriesId/volumes/:volumeId')
    async updateOneVolume(
        @Param('seriesId', ParseIntPipe) seriesId: number,
        @Param('volumeId', ParseIntPipe) VolumeId: number,
        @Body() dto: CreateVolumeDto,
    ) {
        return this.volumesService.updateOneVolume(VolumeId, dto, seriesId);
    };
};
