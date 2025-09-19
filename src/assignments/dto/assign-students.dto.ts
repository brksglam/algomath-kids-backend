import { IsArray, IsMongoId } from 'class-validator';

export class AssignStudentsDto {
  @IsArray()
  @IsMongoId({ each: true })
  studentIds: string[];
}
