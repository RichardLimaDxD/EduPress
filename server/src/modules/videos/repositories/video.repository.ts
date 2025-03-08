import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { Video } from '../entities/video.entity';

export abstract class VideosRepository {
  abstract create(data: CreateVideoDto, courseId: string): Promise<Video>;
  abstract findAll(courseId: string): Promise<Video[]>;
  abstract findOne(id: string): Promise<Video | null>;
  abstract upload(id: string, data: UpdateVideoDto): Promise<Video>;
}
