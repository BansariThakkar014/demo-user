import { StudentCourse } from 'src/api/student-course/entity/student-course.entity';
import { User } from 'src/api/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, Index } from 'typeorm';

@Entity()
export class Course {
    @PrimaryGeneratedColumn('increment', { type: 'bigint' })
    id: number;

    @Column({ nullable: false, type: 'varchar' })
    @Index()
    title: string;

    @Column({ nullable: false, type: 'text' })
    description: string;

    @Column({ nullable: false, name: 'user_id', type: 'bigint' })
    userId: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @Column({ default: true, name: 'is_active' })
    isActive: boolean;

    // Relationship with User entity (course creator)
    @ManyToOne(() => User, user => user.courses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    // Relationship with StudentsCourse entity (student enrollments)
    @OneToMany(() => StudentCourse, studentCourse => studentCourse.course)
    studentCourses: StudentCourse[];
}