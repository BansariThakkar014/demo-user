import { PartialType } from "@nestjs/swagger";
import { CreateStudentsCourseDto } from "./create-student-course.dto";

export class UpdateStudentsCourseDto extends PartialType(CreateStudentsCourseDto){}