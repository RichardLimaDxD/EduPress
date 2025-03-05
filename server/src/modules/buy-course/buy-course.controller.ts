import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BuyCourseService } from './buy-course.service';
import { CreateBuyCourseDto } from './dto/create-buy-course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestUser } from '../users/interfaces/users.interface';
import { UserDecorator } from '../auth/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('buy-course')
export class BuyCourseController {
  constructor(private readonly buyCourseService: BuyCourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createBuyCourseDto: CreateBuyCourseDto,
    @Request() request: RequestUser,
  ) {
    return await this.buyCourseService.create(
      createBuyCourseDto,
      request.user.id,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@UserDecorator() user: User) {
    return await this.buyCourseService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.buyCourseService.findOne(id);
  }
}
