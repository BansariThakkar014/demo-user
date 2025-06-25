import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, Validate,  IsMobilePhone, IsAlpha } from "class-validator"
import { CustomPassword } from "./CustomPassword";
import { Transform } from "class-transformer";

export enum Role {
    ADMIN = 'Admin',
    TEACHER = 'Teacher',
    STUDENT = 'Student'
}

export class CreateUserDto {
    @ApiProperty({
        description: 'The first name of the user',
        example: 'Bansari',
        required: true
    })
    @IsAlpha(undefined,{message:"Please enter valid firstName"})
    firstName: string;


    @ApiProperty({
        description: 'The last name of the user',
        example: 'Thakkar',
        required: true
    })
    @IsAlpha(undefined,{message:"Please enter valid lastName"})
    lastName: string;

    
    @ApiProperty({
        description: 'The email address of user',
        example: 'bansarithakkar@gmail.com',
        required: true
    })
    @IsEmail({}, { message: 'Please enter a valid email address' })
    email: string;
    
    @ApiProperty({
        description: '',
        example: 'Bansari@123',
        required: true
    })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {
        message:
            'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
    })
    password: string;
 
    @ApiProperty({
        description: '',
        example: 'Bansari@123',
        required: true
    })
    @Validate(CustomPassword, {message: 'Password and confirm password should be same.'})
    confirmPassword: string;

    @ApiProperty({
        description: 'The phone number of the user',
        example: '+1234567890',
        required: true
    })
    @IsMobilePhone('en-IN', {}, {message:'Mobile Number is not valid'})
    phone: string;

    @ApiProperty({
        description: 'The address of the user',
        example: '123 Main Street, Apt 4B',
        required: true
    })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString({ message: 'Please enter valid address' })
    @IsNotEmpty({ message: 'Address is required' })
    address: string;

    @ApiProperty({
        description: 'The city of the user',
        example: 'New York',
        required: true
    })
    @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
    @IsString({ message: 'Please enter valid city' })
    @IsNotEmpty({ message: 'City is required' })
    city: string;
}
