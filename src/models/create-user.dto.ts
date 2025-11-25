import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    last_name: string;

    @IsString()
    first_name: string;

    @IsString()
    @MinLength(6)
    password: string;
}