import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateQuizQuestionDto {
  @IsString()
  text: string;

  @IsArray()
  @ArrayMinSize(2)
  options: string[];

  @IsString()
  correctAnswer: string;
}

export class CreateQuizDto {
  @IsMongoId()
  courseId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuizQuestionDto)
  questions: CreateQuizQuestionDto[];
}
