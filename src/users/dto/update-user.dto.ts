import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsEnum, IsMongoId, IsOptional } from 'class-validator';
import { Role } from '../../common/enums/roles.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  courses?: string[];
}
