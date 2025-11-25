import { Injectable } from '@nestjs/common';
import { Serie } from './serie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

    async createSerie(serie: Serie): Promise<string> {
            // crée une nouvelle série
            try {
                await this.seriesRepository.save(serie)
                return `Cette série a été créé : ${serie.title}`
    
            } catch (error) {
                console.log('error :::::' , error)
                throw new Error("Impossible de créer la série")
            }
        }
}
