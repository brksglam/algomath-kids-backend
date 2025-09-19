import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuizQuestionDto {
  @ApiProperty({ example: '2+2 kaç eder?' })
  @IsString()
  text: string;

  @ApiProperty({ type: [String], example: ['3', '4', '5'] })
  @IsArray()
  @ArrayMinSize(2)
  options: string[];

  @ApiProperty({ example: '4' })
  @IsString()
  correctAnswer: string;
}

export class CreateQuizDto {
  @ApiProperty({ example: '66ed2a3f4f5e9b1234567890' })
  @IsMongoId()
  courseId: string;

  @ApiProperty({ example: 'Toplama İşlemleri' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Basit toplama soruları' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [CreateQuizQuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuizQuestionDto)
  questions: CreateQuizQuestionDto[];
}
