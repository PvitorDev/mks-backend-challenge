import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities';
import { AuthRequest } from '../../user/interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
