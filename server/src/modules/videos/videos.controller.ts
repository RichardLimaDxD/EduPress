import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto) {
    return await this.videosService.create(
      createVideoDto,
      createVideoDto.courseId,
    );
  }

  @Get('all/:id')
  async findAll(@Param('id') id: string) {
    return await this.videosService.findAll(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.videosService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'video_url', maxCount: 1 }]))
  async update(
    @Param('id') id: string,
    @UploadedFiles()
    files: { video_url: Express.Multer.File[] },
  ) {
    const { video_url } = files;

    return await this.videosService.update(video_url[0], id);
  }
}
