import { ApiProperty } from '@nestjs/swagger';

export class CreateUserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdAt: string;
}

export class UserLoginResponse {
  @ApiProperty()
  access_token: string;
}
export class UserUpdateResponse extends CreateUserResponse {}

export class UserFindResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  moviesAdded: [];
}

export class CreateMovieResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  yearRelease: number;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  synopsis: string;

  @ApiProperty()
  ageRating: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdAt: string;
}
export class FindAllMoviesResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;

  @ApiProperty()
  director: string;

  @ApiProperty()
  yearRelease: number;

  @ApiProperty()
  genre: string;

  @ApiProperty()
  synopsis: string;

  @ApiProperty()
  ageRating: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  addedByUser: [];
}
export class FindMovieByIdResponse extends CreateMovieResponse {}
export class MovieUpdateResponse extends CreateMovieResponse {}

export class BadResponse {
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
  @ApiProperty()
  statusCode: number;
}
