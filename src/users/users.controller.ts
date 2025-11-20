import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

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
    async postUser(@Body() user: User) {
        const data = await this.usersService.createUser(user);
        
        return data;
    }
}
