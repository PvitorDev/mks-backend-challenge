import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { User } from 'src/user/entities';
User;
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
  yearRelease: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  synopsis: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ageRating: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  rating: string;

  @ApiProperty({ type: () => User })
  addedByUser?: User;
}
