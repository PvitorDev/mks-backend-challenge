// src/decorators/swagger.decorators.ts
import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from 'src/user/dto';
import { User } from 'src/user/entities';
export function ApiGetUserById() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get user by ID' }),
    ApiResponse({ status: 200, description: 'The found record', type: User }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}

export function ApiGetMyProfile() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get my profile' }),
    ApiResponse({ status: 200, description: 'The user profile', type: User }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create user' }),
    ApiBody({ type: CreateUserDto }),

    ApiResponse({
      status: 201,
      description: 'The record has been successfully created',
      type: User,
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}

export function ApiUpdateUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Update user' }),
    ApiParam({ name: 'id', description: 'User ID' }),
    ApiBody({ type: UpdateUserDto }),
    ApiResponse({
      status: 200,
      description: 'The record has been successfully updated',
      type: User,
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}

export function ApiDeleteUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Delete user' }),
    ApiParam({ name: 'id', description: 'User ID' }),
    ApiResponse({
      status: 200,
      description: 'The record has been successfully deleted',
    }),
    ApiResponse({ status: 404, description: 'Not Found' }),
  );
}
export function ApiLoginUser() {
  return applyDecorators(
    ApiOperation({ summary: 'User login' }),
    ApiBody({ type: LoginUserDto }),
    ApiResponse({ status: 200, description: 'Successful login', type: User }), // Ajuste o tipo se necessário
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
}
