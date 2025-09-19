import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  teachers?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  students?: string[];
}
