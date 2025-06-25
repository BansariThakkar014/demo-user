import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CourseRepositry } from './course.repositry';
import { CreateCourseDto } from './dto/create-course.dto';
import { Like } from 'typeorm';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(private readonly courseRepositry: CourseRepositry){}

    // Create Course
    async create(body: CreateCourseDto){
        try {
            await this.courseRepositry.createCourse(body)
        
            return{
                status: HttpStatus.OK,
                message: 'Course Created Successfully...'
            }   
    
        } catch (error) {
            if(error) throw new BadRequestException("Something went wrong.")
        }
    }

    // Get all courses with searching and order by
    async getAllCourses(search: string){
        try {
            // Check if search parameter mathes our course title or not
            const where = search ? {title: Like(`%${search}%`),isActive:true} : {isActive:true}
            
            // findAndCount finds search pattern and count total records
            const result = await this.courseRepositry.findAndCount({order: {createdAt: 'DESC'}, where})        
        
            return{
                status: HttpStatus.OK,
                message: 'Courses Fetched Successfully...!!',
                data: result
            }   
        } catch (error) {
            if(error) throw new BadRequestException("Something went wrong.")
        }
    }

    // Get particular course using ID
    async getById(id: number){
        try {
            // Checks if ID is exist or not
            const course = await this.courseRepositry.findOneBy({id})
            if(!course){
                return{
                    status: HttpStatus.NOT_FOUND,
                    message: 'Course Not Found...!!'
                }
            }
            // If Course ID exist then display the Course
            return{
                status: HttpStatus.OK,
                message: 'Course Fetched Successfully...!!!',
                data: course
            }   
        } catch (error) {
            if(error)  throw new BadRequestException("Something went wrong.")
        }
    }

    // Delete course using ID
    async deleteById(id: number){
        try {
            // Checks if ID is exist or not
            const course = await this.courseRepositry.findOneBy({id})
            if(!course){
                return{
                    status: HttpStatus.NOT_FOUND,
                    message: 'Course Not Found...!!'
                }
            }

            // If course ID exist then delete that course
            await this.courseRepositry.delete(id)
            return{
                status: HttpStatus.OK,
                message: 'Course Deleted Successfully...!!!'
            }   
        } catch (error) {
            if(error)  throw new BadRequestException("Something went wrong.")
        }
    }

    // Update course using ID
    async updateById(id: number, body: UpdateCourseDto){
        try {
            // Checks if course with the id parameter exist or not
            const course = await this.courseRepositry.findOneBy({id})
            if(!course){
                return{
                    status: HttpStatus.NOT_FOUND,
                    message: 'Course Not Found...!!'
                }
            }
            // If course exist then update it
            await this.courseRepositry.update(id, body)

            const result = await this.courseRepositry.findOneBy({id})

            return{
                status: HttpStatus.OK,
                message: 'Course Updates Successfully...!!',
                data: result
            }      
        } catch (error) {
            if(error) throw new BadRequestException("Something went wrong.")
        }
    }
}