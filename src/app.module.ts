import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './api/user/user.module';
import { CourseModule } from './api/course/course.module';
import configration from './config/configration';
import { StudentCourseModule } from './api/student-course/student-course.module';
import { AuthModule } from './api/auth/auth.module';
import { getDatabaseConfig } from './config/mysql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configration],
    }),
   TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    AuthModule,
    CourseModule,
    UserModule,
    StudentCourseModule,
  ],
})
export class AppModule {}