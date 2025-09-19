import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDateString, IsMongoId, IsOptional } from 'class-validator';
import { CreateAssignmentDto } from './create-assignment.dto';

export class UpdateAssignmentDto extends PartialType(CreateAssignmentDto) {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  assignedTo?: string[];

  @IsOptional()
  @IsDateString()
  deadline?: string;
}
