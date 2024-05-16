import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @ApiProperty()
  title?: string;

  @IsString()
  @ApiProperty()
  director?: string;

  @IsNumber()
  @ApiProperty()
  year?: number;

  @IsString()
  @ApiProperty()
  genre?: string;
}
