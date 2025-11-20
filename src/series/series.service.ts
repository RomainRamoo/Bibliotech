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
            // récupère un utilisateur avec un id
            return this.seriesRepository.findOneBy({id});
        }

    async createUser(serie: Serie): Promise<string> {
            // crée un nouvel utilisateur
            try {
                await this.seriesRepository.save(serie)
                return `cette série a été posté : ${serie.title}`
    
            } catch (error) {
                console.log('error :::::' , error)
                throw new Error("Impossible de créer la série")
            }
        }
}
