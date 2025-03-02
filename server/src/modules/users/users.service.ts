import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (findUser) throw new ConflictException('Email already exists');

    return await this.usersRepository.create(createUserDto);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async findOne(id: string) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) throw new NotFoundException('User not found!');

    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto, userId: string) {
    const findUser = await this.usersRepository.findOne(id);

    if (id !== userId) throw new ForbiddenException('Insufficient permission');

    if (!findUser) throw new NotFoundException('User not found!');

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string, userId: string) {
    const findUser = await this.usersRepository.findOne(id);

    if (id !== userId) throw new ForbiddenException('Insufficient permission');

    if (!findUser) throw new NotFoundException('User not found!');

    return this.usersRepository.delete(id);
  }
}
