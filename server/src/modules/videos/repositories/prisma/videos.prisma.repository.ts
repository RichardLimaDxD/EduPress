import { Injectable } from '@nestjs/common';
import { VideosRepository } from '../video.repository';
import { CreateVideoDto } from '../../dto/create-video.dto';
import { Video } from '../../entities/video.entity';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateVideoDto } from '../../dto/update-video.dto';

@Injectable()
export class VideoPrismaRepository implements VideosRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateVideoDto, courseId: string): Promise<Video> {
    const video = new Video();
    Object.assign(video, {
      ...data,
    });

    return await this.prisma.video.create({
      data: { ...video, courseId: courseId },
    });
  }

  async findAll(courseId: string): Promise<Video[]> {
    return await this.prisma.video.findMany({
      where: { courseId },
    });
  }

  async findOne(id: string): Promise<Video | null> {
    return await this.prisma.video.findFirst({
      where: { id },
    });
  }

  async upload(id: string, data: UpdateVideoDto): Promise<Video> {
    return await this.prisma.video.update({
      where: { id },
      data: { ...data },
    });
  }
}
