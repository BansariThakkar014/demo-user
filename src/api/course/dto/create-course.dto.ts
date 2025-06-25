import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsAlphanumeric, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCourseDto {

    @ApiProperty({
        required: true,
        description: 'Course Name',
        example: 'abc'
    })
    @IsAlphanumeric(undefined, { message: 'Course name should contain only alphabets and numbers.' })
    title: string

    @ApiProperty({
        required: true,
        description: 'Course Description',
        example: 'abc'
    })
    @IsNotEmpty({
        message: 'Course description should not be empty.'
    })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString({
        message:"Description should be string"
    })
    description: string

    @ApiProperty({
        required: true,
        description: 'userId',
        example: 1
    })
    @IsNotEmpty({ 
        message: 'userId should not be empty.'
    })
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'userId should be a number.' }
    )
    userId: number
}

