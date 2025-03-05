import { MyCourse } from '@prisma/client';
import { CreateBuyCourseDto } from '../dto/create-buy-course.dto';

export abstract class BuyCourseRepository {
  abstract create(
    data: CreateBuyCourseDto,
    userId: string,
    courseId: string,
  ): Promise<MyCourse>;
  abstract findAll(userId: string): Promise<MyCourse[]>;
  abstract findOne(id: string): Promise<MyCourse | null>;
}
