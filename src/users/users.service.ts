import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async getAllUsers(): Promise<User[]> {
        // récupère tous les utilisateurs
        return await this.userRepository.find()
    }

    async getOneUser(id: number): Promise<User | null> {
        // récupère un utilisateur avec un id
        return this.userRepository.findOneBy({id});
    }

    async createUser(user: User): Promise<string> {
        // crée un nouvel utilisateur
        try {
            await this.userRepository.save(user)
            return `cet user à été posté : ${user.username}`

        } catch (error) {
            console.log('error :::::' , error)
            throw new Error("Impossible de créer l'utilisateur")
        }
    }

    async deleteOneUser(id: number): Promise<void> {
        // supprime un utilisateur avec un id
        await this.userRepository.delete(id);
    }
}
