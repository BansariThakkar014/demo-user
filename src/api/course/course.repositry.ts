import { Injectable } from "@nestjs/common";
import { Course } from "./entity/course.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CourseRepositry extends Repository<Course>{
    constructor(private readonly dataSource: DataSource){
        super(Course, dataSource.createEntityManager())
    }

    async createCourse(courseData: Partial<Course>): Promise<Course>{
        const course = this.create(courseData)
        return await this.save(course)
    }
    
    async findByTitle(title: string):Promise<Course | null>{
        return await this.findOne({where: {title}})
    }
}