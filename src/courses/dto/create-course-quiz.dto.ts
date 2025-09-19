import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseQuizQuestionDto {
  @ApiProperty({ example: '2+2 kaç eder?' })
  @IsString()
  text!: string;

  @ApiProperty({ type: [String], example: ['3', '4', '5'] })
  @IsArray()
  @ArrayMinSize(2)
  options!: string[];

  @ApiProperty({ example: '4' })
  @IsString()
  correctAnswer!: string;
}

export class CreateCourseQuizDto {
  @ApiProperty({ example: 'Toplama İşlemleri' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({ example: 'Basit toplama soruları' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [CreateCourseQuizQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCourseQuizQuestionDto)
  questions!: CreateCourseQuizQuestionDto[];
}
