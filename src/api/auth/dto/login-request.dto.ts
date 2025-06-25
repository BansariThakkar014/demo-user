import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginRequestDto{
    @ApiProperty({
        example:'bansari.thakkar@bytestechnolab.com'
    })
    @IsEmail({}, {message: 'Please enter a valid email.'})
    email: string

    @ApiProperty({example: 'Bansari@123'})
    @IsString({message:"Please enter valid password"})
    password: string
}
