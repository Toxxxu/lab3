import { IsNumber, IsString } from "class-validator";
export class CreateCommentDto {
    @IsNumber()
    public postId: number;
    @IsString()
    public text: string
}