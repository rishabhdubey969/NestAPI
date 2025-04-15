import { IsNotEmpty, IsString, MinLength, IsDate } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    readonly user_id: string;
    @IsNotEmpty()
    @IsString()
    readonly first_name: string;
    @IsNotEmpty()
    @IsString()
    readonly last_name: string;
    @IsNotEmpty()
    @MinLength(10)
    @MinLength(10)
    readonly phone: string;
    @IsNotEmpty()
    @IsString()
    readonly gender: string;
    @IsNotEmpty()
    @IsDate()
    readonly date_of_birth: Date;
    @IsNotEmpty()
    @IsString()
    readonly city: string;
    @IsNotEmpty()
    @IsString()
    readonly address: string;
    @IsNotEmpty()
    @IsString()
    readonly material_status: string;
    @IsNotEmpty()
    @IsString()
    readonly country: string;
    @IsString()
    readonly image: string;

}
