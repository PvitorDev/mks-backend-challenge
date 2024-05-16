import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(2, 25)
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsEmail({})
  @Length(3, 255)
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(8, 15)
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
