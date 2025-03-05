import { Injectable } from '@nestjs/common';
import { BuyCourseRepository } from '../buy-course.repository';
import { MyCourse } from '@prisma/client';
import { CreateBuyCourseDto } from '../../dto/create-buy-course.dto';
import { PrismaService } from 'src/database/prisma.service';
import { BuyCourse } from '../../entities/buy-course.entity';

@Injectable()
export class BuyCoursePrismaRepository implements BuyCourseRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateBuyCourseDto,
    userId: string,
    courseId: string,
  ): Promise<MyCourse> {
    const buyCourse = new BuyCourse();
    Object.assign(buyCourse, {
      ...data,
    });

    return await this.prisma.myCourse.create({
      data: { ...buyCourse, userId: userId, courseId: courseId },
    });
  }

  async findAll(userId: string): Promise<MyCourse[]> {
    return await this.prisma.myCourse.findMany({
      where: {
        userId: userId,
      },
      include: {
        course: true,
      },
    });
  }

  async findOne(id: string): Promise<MyCourse | null> {
    return await this.prisma.myCourse.findFirst({
      where: { id },
      include: {
        course: true,
      },
    });
  }
}
