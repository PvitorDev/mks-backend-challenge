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
  yearRelease?: number;

  @IsString()
  @ApiProperty()
  genre?: string;

  @IsString()
  @ApiProperty()
  synopsis?: string;

  @IsString()
  @ApiProperty()
  ageRating: string;

  @IsString()
  @ApiProperty()
  rating?: string;
}
