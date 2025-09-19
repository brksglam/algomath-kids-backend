import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatMessageDto {
  @IsMongoId()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
