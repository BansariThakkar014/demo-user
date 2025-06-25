import { Course } from 'src/api/course/entity/course.entity';
import { StudentCourse } from 'src/api/student-course/entity/student-course.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

export enum UserRole {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment',{type:'bigint'})
    id: number;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    @Index()
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false, type: 'text' })
    address: string;

    @Column({ nullable: false })
    city: string;

    @CreateDateColumn({  name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', onUpdate:"CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    @Column({ nullable: false, default: UserRole.STUDENT, name: 'user_role', enum: UserRole, type: 'enum' })
    userRole: UserRole;

    // Relationship with Course entity (for course creators)
    @OneToMany(() => Course, course => course.user)
    courses: Course[];

    // Relationship with StudentsCourse entity (for course enrollments)
    @OneToMany(() => StudentCourse, studentCourse => studentCourse.user)
    studentCourses: StudentCourse[];
}