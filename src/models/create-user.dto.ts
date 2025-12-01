import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    @Transform(({value}) => value.trim())
    email: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({value}) => value.trim())
    username: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({value}) => value.trim())
    last_name: string;

    @IsNotEmpty()
    @IsString()
    @Transform(({value}) => value.trim())
    first_name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}