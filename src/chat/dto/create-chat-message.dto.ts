import { IsMongoId, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsMongoId()
  courseId: string;

  @IsString()
  content: string;
}
