import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  documents?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  assignments?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  quizzes?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  chats?: string[];
}
