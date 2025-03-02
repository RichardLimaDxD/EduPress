import { Course } from '@prisma/client';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';

export abstract class CoursesRepository {
  abstract create(data: CreateCourseDto, userId: string): Promise<Course>;
  abstract findAll(): Promise<Course[]>;
  abstract findOne(id: string): Promise<Course | null>;
  abstract update(id: string, data: UpdateCourseDto): Promise<Course>;
  abstract delete(id: string): Promise<void>;
}
