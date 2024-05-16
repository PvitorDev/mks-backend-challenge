import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({ message: '' })
  @Length(2, 25, {
    message: '',
  })
  @IsNotEmpty({
    message: '',
  })
  @ApiProperty()
  username: string;

  @IsEmail({}, { message: '' })
  @Length(3, 255, { message: '' })
  @IsNotEmpty({ message: '' })
  @ApiProperty()
  email: string;

  @IsString({ message: '' })
  @Length(8, 15, {
    message: '',
  })
  @IsNotEmpty({
    message: '',
  })
  @ApiProperty()
  password: string;
}
