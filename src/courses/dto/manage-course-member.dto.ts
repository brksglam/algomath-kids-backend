import { IsMongoId } from 'class-validator';

export class ManageCourseMemberDto {
  @IsMongoId()
  userId: string;
}
