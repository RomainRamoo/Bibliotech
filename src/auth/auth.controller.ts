import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/models/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    async getAuth(@Body() authBody: CreateUserDto) {
        const data = await this.authService.login(authBody);

        return data
    }
}
