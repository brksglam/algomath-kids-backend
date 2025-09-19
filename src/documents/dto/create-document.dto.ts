import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDocumentDto {
  @ApiProperty({ example: '66ed2a3f4f5e9b1234567890' })
  @IsMongoId()
  courseId: string;

  @ApiPropertyOptional({ example: 'Ders Notu 1' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'PDF ders notu' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ type: [String], description: 'Belirtilirse sadece bu öğrencilere görünür' })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  recipients?: string[];
}
