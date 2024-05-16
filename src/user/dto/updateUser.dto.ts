import { IsString, IsEmail, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @Length(2, 25)
  @IsOptional()
  @ApiProperty()
  username?: string;

  @IsEmail({})
  @Length(3, 255)
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString()
  @Length(8, 15)
  @IsOptional()
  @ApiProperty()
  password?: string;
}
