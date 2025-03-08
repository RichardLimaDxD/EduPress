import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosRepository } from './repositories/video.repository';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs';

@Injectable()
export class VideosService {
  constructor(private videoRepository: VideosRepository) {}

  async create(createVideoDto: CreateVideoDto, courseId: string) {
    return await this.videoRepository.create(createVideoDto, courseId);
  }

  async findAll(courseId: string) {
    return await this.videoRepository.findAll(courseId);
  }

  async findOne(id: string) {
    return await this.videoRepository.findOne(id);
  }

  async update(video_url: Express.Multer.File, id: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });

    const uploadVideo = await cloudinary.uploader.upload(
      video_url.path,
      { resource_type: 'video' },
      (_error, result) => {
        return result;
      },
    );

    const uploadFiles = await this.videoRepository.upload(id, {
      video_url: uploadVideo.secure_url,
    });

    unlink(video_url.path, (error) => {
      if (error) {
      }
    });

    return uploadFiles;
  }
}
