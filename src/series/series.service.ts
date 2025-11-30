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
        // Vérifie si la série existe déjà
        const existingSerie = await this.seriesRepository.findOne({ where: { title: dto.title}});
        if (existingSerie) {
            throw new Error("Cet série est déjà créée")
        }
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

    async updateOneSerie (id: number, dto: CreateSerieDto): Promise<string> {
        try {
            const serie = await this.seriesRepository.findOne({ where: { id }});

            if (!serie) {
                throw new Error(`La série avec l'id ${id} n'existe pas`);
            }

            const updatedSerie = await this.seriesRepository.save({
                ...serie,
                ...dto,
            });

            return `La série ${updatedSerie.title} a été modifié `
        } catch (error) {
            console.log('error :::::' , error)
            throw new Error("Impossible de modifier la série")
        }
    }
}
