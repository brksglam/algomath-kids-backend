import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChatPolicy } from '../../common/enums/chat-policy.enum';
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

  @ApiPropertyOptional({ enum: ChatPolicy, description: 'Kurs içi chat politikası' })
  @IsOptional()
  @IsEnum(ChatPolicy)
  chatPolicy?: ChatPolicy;
}
