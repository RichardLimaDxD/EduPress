import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuyCourseDto } from './dto/create-buy-course.dto';
import { BuyCourseRepository } from './repositories/buy-course.repository';

@Injectable()
export class BuyCourseService {
  constructor(private buyCourseRepository: BuyCourseRepository) {}

  async create(createBuyCourseDto: CreateBuyCourseDto, userId: string) {
    return await this.buyCourseRepository.create(
      createBuyCourseDto,
      userId,
      createBuyCourseDto.courseId,
    );
  }

  async findAll(userId: string) {
    return await this.buyCourseRepository.findAll(userId);
  }

  async findOne(id: string) {
    const findCourse = await this.buyCourseRepository.findOne(id);

    if (!findCourse) throw new NotFoundException('Course not found.');

    return findCourse;
  }
}
