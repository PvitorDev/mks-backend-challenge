import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateMovieDto, UpdateMovieDto } from '../movies/dto';
import { Movie } from '../movies/entities';

export function ApiGetMovieById() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get Movie by ID' }),
    ApiResponse({
      status: 200,
      description: 'The found record',
      type: () => Movie,
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}

export function ApiGetMovieAll() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get all Movie by ID' }),
    ApiResponse({
      status: 200,
      description: 'The found record',
      type: () => Movie,
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}

export function ApiCreateMovie() {
  return applyDecorators(
    ApiOperation({ summary: 'Create Movie' }),
    ApiBody({ type: () => CreateMovieDto }),
    ApiResponse({
      status: 201,
      description: 'The record has been successfully created',
      type: () => Movie,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
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
      type: () => Movie,
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
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
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}
