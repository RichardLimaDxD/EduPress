import { Roles, User } from '@prisma/client';

export interface AuthRequest extends Request {
  user: User;
}

export interface Payload {
  sub: string;
  email: string;
  roles: Roles;
}
