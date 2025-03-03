import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Roles } from '@prisma/client';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto, role: Roles) {
    const retrieveCategoryByName = await this.categoryRepository.findByName(
      createCategoryDto.name,
    );

    if (retrieveCategoryByName)
      throw new ConflictException('Category already exist.');

    if (role != 'SELLER')
      throw new UnauthorizedException('Only sellers can create category');

    return await this.categoryRepository.create(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.findAll();
  }

  async findOne(id: string) {
    const findCategory = await this.categoryRepository.findOne(id);

    if (!findCategory) throw new NotFoundException('Category not found.');

    return findCategory;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, role: Roles) {
    const findCategory = await this.categoryRepository.findOne(id);

    if (!findCategory) throw new NotFoundException('Category not found.');

    if (role != 'SELLER')
      throw new UnauthorizedException('Insufficient permission');

    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string, role: Roles) {
    const findCategory = await this.categoryRepository.findOne(id);

    if (!findCategory) throw new NotFoundException('Category not found.');

    if (role != 'SELLER')
      throw new UnauthorizedException('Insufficient permission');

    return await this.categoryRepository.delete(id);
  }
}
