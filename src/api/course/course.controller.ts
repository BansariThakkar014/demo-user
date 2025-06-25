import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @Post('create-course')
  createCourse(@Body() body: CreateCourseDto) {
    return this.courseService.create(body);
  }

  @Get('get-all-courses')
  getAllCourses(@Query('search') search: string) {
    return this.courseService.getAllCourses(search);
  }

  @Get('get-course-id/:id')
  getById(@Param('id') id: number) {
    return this.courseService.getById(id);
  }

  @Delete('delete-course-id/:id')
  deleteById(@Param('id') id: number) {
    return this.courseService.deleteById(id);
  }

  @Patch('update-course-id/:id')
  updateById(@Param('id') id: number, @Body() body: UpdateCourseDto) {
    return this.courseService.updateById(id, body);
  }
}

