import { IsString, IsNumber } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  title?: string;

  @IsString()
  director?: string;

  @IsNumber()
  year?: number;

  @IsString()
  genre?: string;
}
