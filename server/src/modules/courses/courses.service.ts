import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './repositories/courses.repository';
import { Roles } from '@prisma/client';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(private courseRepository: CoursesRepository) {}

  async create(
    data: CreateCourseDto,
    userId: string,
    role: Roles,
    categoryId: string,
  ) {
    if (role != 'SELLER')
      throw new UnauthorizedException('Only sellers can create course');

    if (!categoryId) throw new NotFoundException('Category not found.');

    return await this.courseRepository.create(data, userId, categoryId);
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.findAll();
  }

  async findOne(id: string) {
    const findCourse = await this.courseRepository.findOne(id);

    if (!findCourse) throw new NotFoundException('Course not found');

    return await this.courseRepository.findOne(id);
  }

  async update(id: string, data: UpdateCourseDto, userId: string, role: Roles) {
    const findCourse = await this.courseRepository.findOne(id);

    if (!findCourse) throw new NotFoundException('Course not found');

    if (findCourse.userId != userId)
      throw new ConflictException('Insufficient permission');

    if (role != 'SELLER')
      throw new UnauthorizedException('Only sellers can update course');

    return await this.courseRepository.update(userId, data);
  }

  async remove(id: string, userId: string, role: Roles) {
    const findCourse = await this.courseRepository.findOne(id);

    if (!findCourse) throw new NotFoundException('Course not found');

    if (findCourse.userId != userId)
      throw new ConflictException('Insufficient permission');

    if (role != 'SELLER')
      throw new UnauthorizedException('Insufficient permission');

    return await this.courseRepository.delete(id);
  }
}
