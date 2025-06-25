import { Course } from "src/api/course/entity/course.entity";
import { User } from "src/api/user/entity/user.entity";
import { Column, Entity,  JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('student-course')
// @Index(['userId', 'courseId'], {unique: true})
export class StudentCourse{
    @PrimaryGeneratedColumn('increment',{type:'bigint'})
    id: number

    @Column({nullable: false, type: 'bigint', name:'user_id'})
    userId: number

    @Column({nullable: false, type: 'bigint', name:'course_id'})
    courseId: number

    @Column({name: 'created_at', type: 'timestamp'})
    createdAt: Date

    @Column({name: 'updated_at', type: 'timestamp', onUpdate:"CURRENT_TIMESTAMP"})
    updatedAt: Date

    @Column({name:'is_active', default: true})
    isActive: boolean

    // Relationship with User entity
    @ManyToOne(() => User, user => user.studentCourses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    // Relationship with Course entity
    @ManyToOne(() => Course, course => course.studentCourses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id' })
    course: Course;
} 