import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users.repository';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { Roles } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const users = new User();
    Object.assign(users, {
      ...data,
      roles: Roles.USER,
    });

    const response = await this.prisma.user.create({
      data: { ...users },
    });

    return plainToInstance(User, response);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return plainToInstance(User, user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userByEmail = await this.prisma.user.findFirst({
      where: { email },
    });
    return userByEmail;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(User, user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
