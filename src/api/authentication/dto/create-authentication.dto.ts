import { IsNotEmpty, IsString, IsEmail, MinLength , IsInt, IsBoolean} from 'class-validator';
export class CreateAuthenticationDto {

    @IsNotEmpty()
    @IsString()
    readonly username: string;
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
    @IsNotEmpty()
    @IsInt()
    readonly role: number;
    @IsNotEmpty()
    @IsBoolean()
    readonly isActive: boolean;

}
