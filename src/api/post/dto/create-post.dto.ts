import { IsNotEmpty, IsString, IsBoolean} from 'class-validator';
export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    @IsString()
    readonly user_id: string;
    @IsNotEmpty()
    @IsBoolean()
    readonly isPublished: boolean;

}
