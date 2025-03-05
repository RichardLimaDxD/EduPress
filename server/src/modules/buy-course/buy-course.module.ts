import { Module } from '@nestjs/common';
import { BuyCourseService } from './buy-course.service';
import { BuyCourseController } from './buy-course.controller';
import { PrismaService } from 'src/database/prisma.service';
import { BuyCourseRepository } from './repositories/buy-course.repository';
import { BuyCoursePrismaRepository } from './repositories/prisma/buy-course.prisma.repository';

@Module({
  controllers: [BuyCourseController],
  providers: [
    BuyCourseService,
    PrismaService,
    {
      provide: BuyCourseRepository,
      useClass: BuyCoursePrismaRepository,
    },
  ],
})
export class BuyCourseModule {}
