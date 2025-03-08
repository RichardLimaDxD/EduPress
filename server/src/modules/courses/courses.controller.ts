import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from '../users/interfaces/users.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @Request() request: RequestUser,
  ) {
    return await this.coursesService.create(
      createCourseDto,
      request.user.id,
      request.user.roles,
      createCourseDto.categoryId,
    );
  }

  @Get()
  async findAll() {
    return await this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateCourseDto,
    @Request() request: RequestUser,
  ) {
    return this.coursesService.update(
      id,
      data,
      request.user.id,
      request.user.roles,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  @Patch('upload/:id')
  async upload(
    @Request() request: RequestUser,
    @UploadedFiles()
    files: { image: Express.Multer.File[] },
    @Param('id') id: string,
  ) {
    const { image } = files;

    return await this.coursesService.upload(image[0], request.user.roles, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() request: RequestUser) {
    return this.coursesService.remove(id, request.user.id, request.user.roles);
  }
}
