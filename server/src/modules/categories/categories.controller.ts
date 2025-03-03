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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from '../users/interfaces/users.interface';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UserDecorator() user: User,
  ) {
    console.log('aaa', createCategoryDto);
    console.log(user);
    return this.categoriesService.create(createCategoryDto, user.roles);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UserDecorator() user: User,
  ) {
    return this.categoriesService.update(id, updateCategoryDto, user.roles);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @UserDecorator() user: User) {
    return this.categoriesService.remove(id, user.roles);
  }
}
