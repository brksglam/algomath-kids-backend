import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class SubmitQuizDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  answers: string[];
}
