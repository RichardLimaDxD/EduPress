import { BadRequestException, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CoursesRepository } from './repositories/courses.repository';
import { CoursePrismaRepository } from './repositories/prisma/courses.prisma.repository';
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
        if (file.mimetype === 'image/webp' || file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          cb(new BadRequestException('Only webp or png format allowed'), false);
        }
      },
    }),
  ],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    PrismaService,
    {
      provide: CoursesRepository,
      useClass: CoursePrismaRepository,
    },
  ],
})
export class CoursesModule {}
