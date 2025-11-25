import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Dto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'john', description: 'The username of the user' })
    login: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1234', description: 'The password of the user' })
    password: string;
}
