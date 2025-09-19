import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsMongoId()
  courseId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
