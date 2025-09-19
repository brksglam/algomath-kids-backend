import { IsMongoId } from 'class-validator';

export class ManageTeacherDto {
  @IsMongoId()
  teacherId: string;
}
