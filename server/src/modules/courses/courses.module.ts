import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CoursesRepository } from './repositories/courses.repository';
import { UserPrismaRepository } from '../users/repositories/prisma/users.prisma.repository';
import { CoursePrismaRepository } from './repositories/prisma/courses.prisma.repository';

@Module({
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
