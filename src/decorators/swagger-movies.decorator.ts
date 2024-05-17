import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateMovieDto, UpdateMovieDto } from '../movies/dto';
import {
  BadResponse,
  FindAllMoviesResponse,
  FindMovieByIdResponse,
  MovieUpdateResponse,
} from 'src/dto';
import { CreateMovieResponse } from 'src/dto';
export function ApiGetMovieById() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get Movie by ID' }),
    ApiResponse({
      status: 200,
      description: 'The found record',
      type: () => FindMovieByIdResponse,
    }),
    ApiResponse({ status: 404, description: 'Not Found', type: BadResponse }),
  );
}

export function ApiGetMovieAll() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get all Movie ' }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: ' Page number for pagination (10)',
    }),
    ApiResponse({
      status: 200,
      description: 'The found record',
      type: () => FindAllMoviesResponse,
    }),
    ApiResponse({ status: 404, description: 'Not Found', type: BadResponse }),
  );
}

export function ApiCreateMovie() {
  return applyDecorators(
    ApiOperation({ summary: 'Create Movie' }),
    ApiBody({ type: () => CreateMovieDto }),
    ApiResponse({
      status: 201,
      description: 'The record has been successfully created',
      type: () => CreateMovieResponse,
    }),
    ApiResponse({ status: 400, description: 'Bad Request', type: BadResponse }),
  );
}

export function ApiUpdateMovie() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update Movie' }),
    ApiParam({ name: 'id', description: 'Movie ID' }),
    ApiBody({ type: () => UpdateMovieDto }),
    ApiResponse({
      status: 200,
      description: 'The record has been successfully updated',
      type: () => MovieUpdateResponse,
    }),
    ApiResponse({ status: 404, description: 'Not Found', type: BadResponse }),
  );
}

export function ApiDeleteMovie() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete Movie' }),
    ApiParam({ name: 'id', description: 'Movie ID' }),
    ApiResponse({
      status: 200,
      description: 'The record has been successfully deleted',
    }),
    ApiResponse({ status: 404, description: 'Not Found', type: BadResponse }),
  );
}
