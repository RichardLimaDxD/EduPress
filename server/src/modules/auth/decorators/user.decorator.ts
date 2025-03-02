import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../interfaces/auth.interface';

export const UserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
