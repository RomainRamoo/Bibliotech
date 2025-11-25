import { Body, Controller, Post } from '@nestjs/common';
import { VolumesService } from './volumes.service';
import { Volume } from './volume.entity';

@Controller('volumes')
export class VolumesController {
    constructor(private readonly volumesService: VolumesService) {}

   

    
}
