import { IsString, IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class Departments {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumberString()
    phone: string;

    @IsEmail()
    email: string;
}
