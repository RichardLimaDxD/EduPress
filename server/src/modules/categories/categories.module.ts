import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryPrismaRepository } from './repositories/prisma/category.prisma.repository';

@Module({
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    PrismaService,
    {
      provide: CategoryRepository,
      useClass: CategoryPrismaRepository,
    },
  ],
})
export class CategoriesModule {}
