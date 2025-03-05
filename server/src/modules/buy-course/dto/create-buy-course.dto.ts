import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBuyCourseDto {
  @IsNotEmpty()
  @IsString()
  courseId: string;
}
