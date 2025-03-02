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

@Injectable()
export class CoursesService {
  constructor(private courseRepository: CoursesRepository) {}

  async create(data: CreateCourseDto, userId: string, role: Roles) {
    if (role != 'SELLER')
      throw new UnauthorizedException('Only sellers can create course');

    return await this.courseRepository.create(data, userId);
  }

  async findAll() {
    await this.courseRepository.findAll();
  }

  async findOne(id: string) {
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
      throw new UnauthorizedException('Only sellers can create course');

    return await this.courseRepository.delete(id);
  }
}
