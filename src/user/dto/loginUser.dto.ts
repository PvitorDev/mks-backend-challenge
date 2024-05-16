import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail({}, { message: '' })
  @IsNotEmpty({ message: '' })
  @ApiProperty()
  email: string;

  @IsString({ message: '' })
  @IsNotEmpty({
    message: '',
  })
  @ApiProperty()
  password: string;
}
