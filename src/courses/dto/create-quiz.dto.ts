import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 'Quiz 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Kısa bir quiz' })
  @IsString()
  @IsOptional()
  description?: string;
}
