import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { Category } from '../../entities/category.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    const category = new Category();
    Object.assign(category, {
      ...data,
    });

    return await this.prisma.category.create({
      data: { ...category },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string): Promise<Category | null> {
    return await this.prisma.category.findFirst({
      where: { id },
    });
  }

  async update(id: string, data: UpdateCategoryDto): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: { ...data },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }
}
