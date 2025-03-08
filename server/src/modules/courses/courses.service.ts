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
import { unlink } from 'fs';
import { v2 as cloudinary } from 'cloudinary';

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

  async upload(image: Express.Multer.File, role: Roles, id: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    if (role != 'SELLER')
      throw new UnauthorizedException('Only sellers can update course');

    const findCourse = await this.findOne(id);

    if (!findCourse) throw new NotFoundException('Course not found!');

    const uploadImage = await cloudinary.uploader.upload(
      image.path,
      { resource_type: 'image' },
      (_error, result) => {
        return result;
      },
    );

    const uploadFiles = await this.courseRepository.upload(id, {
      image: uploadImage.secure_url,
    });

    unlink(image.path, (error) => {
      if (error) {
      }
    });

    return uploadFiles;
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
