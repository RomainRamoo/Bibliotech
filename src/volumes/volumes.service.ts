import { Injectable, NotFoundException } from '@nestjs/common';
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

    async updateOneVolume(
        id: number, 
        dto: CreateVolumeDto, 
        seriesId: number
    ): Promise<string> {
        try {
            const volume = await this.volumesRepository.findOne({ 
                where: { id, series: { id: seriesId }
            },
        });

            if (!volume) {
                throw new Error(`Le volume avec l'id ${id} n'existe pas`);
            }

            const updatedVolume = await this.volumesRepository.save({
                ...volume,
                ...dto,
                series: { id: seriesId }
            });

            return `Le volume ${updatedVolume.volume_number} a été modifié `
        } catch (error) {
            console.log('error :::::' , error)
            throw new Error("Impossible de modifier le volume")
        }

    }

    async deleteOneVolume(seriesId: number, volumeId: number): Promise<Volume> {
        const volume = await this.volumesRepository.findOne({ 
            where: { id: volumeId, series: { id: seriesId } },
            relations: ['series']
        });
        
        if (!volume) {
            throw new NotFoundException(`Volume ${volumeId} not found for series ${seriesId}`);
        }
        
        await this.volumesRepository.delete(volumeId);

        return volume;
        
    };
}
