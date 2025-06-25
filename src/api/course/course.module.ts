import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseRepositry } from './course.repositry';
import { CourseController } from './course.controller';

@Module({
  imports: [],
  controllers: [CourseController],
  providers: [CourseService, CourseRepositry],
})
export class CourseModule {}
