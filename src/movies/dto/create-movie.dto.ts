import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  director: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  year: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  genre: string;
}
