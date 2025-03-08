import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validatedUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      if (password === user.password) {
        return { id: user.id, email: user.email, roles: user.roles };
      }
    }
    return null;
  }

  async login(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new ForbiddenException('User not exist!');
    }

    return {
      token: this.jwtService.sign(
        { email, roles: user.roles },
        { subject: user.id },
      ),
    };
  }
}
