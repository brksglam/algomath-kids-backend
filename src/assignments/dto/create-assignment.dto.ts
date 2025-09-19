import {
  IsArray,
  IsDateString,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({ example: '66ed2a3f4f5e9b1234567890' })
  @IsMongoId()
  courseId: string;

  @ApiProperty({ example: 'Ödev 1' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Haftalık alıştırmalar' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '2025-12-31T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  assignedTo?: string[];

  @ApiPropertyOptional({
    description: 'Visible only to these students if provided',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  recipients?: string[];
}
