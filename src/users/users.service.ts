import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/models/create-user.dto';
import * as bcrypt from 'bcrypt'

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

    async createUser(dto: CreateUserDto): Promise<string> {
        // Vérifie si l'email existe déjà
        const existing = await this.userRepository.findOne({ where: { email: dto.email}});
        if (existing) {
            throw new Error("Cet email est déjà utilisé.");
        }
        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // création de l'entité User
        const user = this.userRepository.create({
            ...dto,
            password: hashedPassword
        });

        try {
            await this.userRepository.save(user)
            return `L'utilisateur a été créé : ${dto.username}`

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
