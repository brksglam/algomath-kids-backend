import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatMessageDto {
  @ApiProperty({ example: '66ed2a3f4f5e9b1234567890' })
  @IsMongoId()
  courseId: string;

  @ApiProperty({ example: 'Merhaba sınıf!' })
  @IsString()
  content: string;

  @ApiProperty({ required: false, description: 'DM için hedef kullanıcı' })
  @IsOptional()
  @IsMongoId()
  recipientId?: string;
}
