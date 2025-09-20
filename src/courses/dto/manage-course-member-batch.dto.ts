import { ArrayNotEmpty, IsArray, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ManageCourseMemberBatchDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  add!: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsMongoId({ each: true })
  remove!: string[];
}


