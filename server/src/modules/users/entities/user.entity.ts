import { Roles } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export class User {
  readonly id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;

  roles: Roles;

  constructor() {
    this.id = randomUUID();
  }
}
