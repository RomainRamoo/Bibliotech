import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/models/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}
    
    async login(authBody: CreateUserDto) {
        
        const { username, password} = authBody;

        const existingUser = await this.userService.getOneUserbyUserName(username);

        if (!existingUser) {
            throw new UnauthorizedException({error: "Nom d'utilisateur ou mot de passe incorrect"});
        } 
        
        const isPasswordValid = await this.isPasswordValid(password, existingUser.password)

        if (!isPasswordValid){
            throw new UnauthorizedException({error: "Nom d'utilisateur ou mot de passe incorrect"})
        } 
        

        return { 
            userId: existingUser.id, 
            username: existingUser.username, 
        };
    }

    private async isPasswordValid(password : string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword)
    }
}
