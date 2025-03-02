import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { VideosModule } from './modules/videos/videos.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, CoursesModule, VideosModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
