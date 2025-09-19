import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'student@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 6, example: 'P@ssw0rd!' })
  @IsString()
  @MinLength(6)
  password: string;
}
