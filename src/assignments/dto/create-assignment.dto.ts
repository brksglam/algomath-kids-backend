import { IsArray, IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsMongoId()
  courseId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  assignedTo?: string[];
}
