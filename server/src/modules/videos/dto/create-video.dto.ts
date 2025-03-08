import { IsOptional, IsString } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  @IsOptional()
  video_url: string | null;

  @IsString()
  title: string;

  @IsString()
  courseId: string;
}
