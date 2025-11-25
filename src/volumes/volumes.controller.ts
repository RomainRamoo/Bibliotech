import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { VolumesService } from './volumes.service';
import { Volume } from './volume.entity';

@Controller('volumes')
export class VolumesController {
    constructor(private readonly volumesService: VolumesService) {}

    @Delete(':id')
        async deleteOneVolume(@Param('id', ParseIntPipe) id: number) {
            return this.volumesService.deleteOneVolume(id);
        }

}
