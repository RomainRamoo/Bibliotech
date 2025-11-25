import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Volume } from './volume.entity';
import { Repository } from 'typeorm';
import { CreateVolumeDto } from 'src/models/create-volume.dto';

@Injectable()
export class VolumesService {
    constructor(
        @InjectRepository(Volume)
        private readonly volumesRepository: Repository<Volume>
    ){}
    async getVolumesBySerie(seriesId: number): Promise<Volume[]> {

        return this.volumesRepository.find({
            where: { series: { id: seriesId }},
            relations: ['series'],
            order: { volume_number: 'ASC'}
        });
    }
    async addNewVolume(dto: CreateVolumeDto, seriesId: number): Promise<Volume> {

        try {
            const existing = await this.volumesRepository.findOne({
                where: {
                    volume_number: dto.volume_number,
                    series: { id: seriesId },
                },
            });

            if (existing) {
                throw new Error(`Le volume ${dto.volume_number} existe déjà pour cette série`);
            }

            const volume = await this.volumesRepository.save({
                ...dto,
                series: { id: seriesId }
            });

            return volume;
        } catch (error) {
            console.log('error :::::', error);
            throw new Error("Impossible de créer le volume")
            
        }
        
    }

    async deleteOneVolume(id: number): Promise<Volume> {
        const volume = await this.volumesRepository.findOne({ where: { id }});
        
        if (!volume) {
            throw new NotFoundException(`Volume with id ${id} not found`);
        }
        
        await this.volumesRepository.delete(id);

        return volume;
        
    };
}
