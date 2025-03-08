import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { RequestUser } from './interfaces/users.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  async findOne(@UserDecorator() user: User) {
    return await this.usersService.findOne(user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() request: RequestUser,
  ) {
    return await this.usersService.update(id, updateUserDto, request.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() request: RequestUser) {
    return await this.usersService.remove(id, request.user.id);
  }
}
