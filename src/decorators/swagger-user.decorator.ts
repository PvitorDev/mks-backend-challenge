import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from '../user/dto';
import { User } from '../user/entities';
import {
  BadResponse,
  CreateUserResponse,
  UserFindResponse,
  UserLoginResponse,
} from 'src/dto';
export function ApiGetUserById() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get user by ID' }),
    ApiResponse({
      status: 200,
      description: 'The found record',
      type: UserFindResponse,
    }),
    ApiResponse({ status: 404, description: 'Not Found', type: BadResponse }),
  );
}

export function ApiGetMyProfile() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({ summary: 'Get my profile' }),
    ApiResponse({
      status: 200,
      description: 'The user profile',
      type: UserFindResponse,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: BadResponse,
    }),
  );
}

export function ApiCreateUser() {
  return applyDecorators(
    ApiOperation({ summary: 'Create user' }),
    ApiBody({ type: CreateUserDto }),

    ApiResponse({
      status: 201,
      description: 'The record has been successfully created',
      type: CreateUserResponse,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad Request',
      type: BadResponse,
    }),
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
      type: UserLoginResponse,
    }),
    ApiResponse({ status: 404, description: 'Not Found', type: BadResponse }),
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
    ApiResponse({ status: 404, description: 'Not Found', type: BadResponse }),
  );
}
export function ApiLoginUser() {
  return applyDecorators(
    ApiOperation({ summary: 'User login' }),
    ApiBody({ type: LoginUserDto }),
    ApiResponse({ status: 200, description: 'Successful login', type: User }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
      type: BadResponse,
    }),
    ApiResponse({ status: 400, description: 'Bad Request', type: BadResponse }),
  );
}
