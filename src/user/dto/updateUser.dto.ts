import { IsString, IsEmail, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString({ message: '' })
  @Length(2, 25, {
    message: '',
  })
  @IsOptional()
  @ApiProperty()
  username?: string;

  @IsEmail({}, { message: '' })
  @Length(3, 255, { message: '' })
  @IsOptional()
  @ApiProperty()
  email?: string;

  @IsString({ message: '' })
  @Length(8, 15, {
    message: '',
  })
  @IsOptional()
  @ApiProperty()
  password?: string;
}
