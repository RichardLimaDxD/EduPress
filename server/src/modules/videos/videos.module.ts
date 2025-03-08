import { BadRequestException, Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { PrismaService } from 'src/database/prisma.service';
import { VideosRepository } from './repositories/video.repository';
import { VideoPrismaRepository } from './repositories/prisma/videos.prisma.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './tmp',
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (
          file.mimetype === 'video/mp4' ||
          file.mimetype === 'image/webp' ||
          file.mimetype === 'image/png'
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only mp4 format allowed'), false);
        }
      },
    }),
  ],
  controllers: [VideosController],
  providers: [
    VideosService,
    PrismaService,
    {
      provide: VideosRepository,
      useClass: VideoPrismaRepository,
    },
  ],
})
export class VideosModule {}
