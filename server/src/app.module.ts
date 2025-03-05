import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BuyCourseModule } from './modules/buy-course/buy-course.module';

@Module({
  imports: [
    UsersModule,
    CoursesModule,
    AuthModule,
    CategoriesModule,
    BuyCourseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
