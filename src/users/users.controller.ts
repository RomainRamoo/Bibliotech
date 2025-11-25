import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

import { CreateUserDto } from 'src/models/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        const data = await this.usersService.getAllUsers();

        return data;
    }

    @Get(":id")
    async getOneUser(@Param('id') id: number) {
        const data = await this.usersService.getOneUser(id);

        return data;
    }

    @Delete(":id")
    async deleteOneUser(@Param('id') id: number) {
        const data = await this.usersService.deleteOneUser(id);
    }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const data = await this.usersService.createUser(dto);
        
        return data;
    }
}
