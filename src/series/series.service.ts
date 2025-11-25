import { Injectable } from '@nestjs/common';
import { Serie } from './serie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSerieDto } from 'src/models/create-serie.dto';

@Injectable()
export class SeriesService {
    constructor(
        @InjectRepository(Serie)
        private readonly seriesRepository: Repository<Serie>
    ){}
    async getAllSeries(): Promise<Serie[]> {
        return await this.seriesRepository.find()
    }

    async getOneSerie(id: number): Promise<Serie | null> {
            // récupère une série avec un id
            return this.seriesRepository.findOneBy({id});
        }

    async createSerie(dto: CreateSerieDto, userId: number): Promise<string> {
            // crée une nouvelle série
            try {
                await this.seriesRepository.save({
                    ...dto,
                    user: { id: userId },
                })
                return `Cette série a été créé : ${dto.title}`
    
            } catch (error) {
                console.log('error :::::' , error)
                throw new Error("Impossible de créer la série")
            }
        }
}
