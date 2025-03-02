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
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from '../users/interfaces/users.interface';

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
    );
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
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
  @Delete(':id')
  remove(@Param('id') id: string, @Request() request: RequestUser) {
    return this.coursesService.remove(id, request.user.id, request.user.roles);
  }
}
