import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Serie } from './serie.entity';

@Controller('series')
export class SeriesController {
    constructor(private readonly seriesService: SeriesService) {}

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
        async postSerie(@Body() serie: Serie) {
            const data = await this.seriesService.createUser(serie);
            
            return data;
        }
}
