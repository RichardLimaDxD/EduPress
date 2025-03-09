import { Injectable } from '@nestjs/common';
import { CoursesRepository } from '../courses.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCourseDto } from '../../dto/create-course.dto';
import { UpdateCourseDto } from '../../dto/update-course.dto';
import { Course } from '../../entities/course.entity';

@Injectable()
export class CoursePrismaRepository implements CoursesRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateCourseDto,
    userId: string,
    categoryId: string,
  ): Promise<Course> {
    const course = new Course();
    Object.assign(course, {
      ...data,
    });

    return await this.prisma.course.create({
      data: { ...course, userId: userId, categoryId: categoryId },
    });
  }

  async findAll(): Promise<Course[]> {
    return await this.prisma.course.findMany({
      include: {
        user: true,
        myCourses: true,
        videos: true,
        _count: true,
      },
    });
  }

  async findOne(id: string): Promise<Course | null> {
    return await this.prisma.course.findFirst({
      where: { id },
      include: {
        user: true,
        myCourses: true,
        videos: true,
        _count: true,
      },
    });
  }

  async update(id: string, data: UpdateCourseDto): Promise<Course> {
    return await this.prisma.course.update({
      where: { id },
      data: { ...data },
    });
  }

  async upload(id: string, data: UpdateCourseDto): Promise<Course> {
    return await this.prisma.course.update({
      where: { id },
      data: { ...data },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.course.delete({
      where: { id },
    });
  }
}
