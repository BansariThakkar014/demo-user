import { BadRequestException, ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repositry';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { Common } from 'src/utilies/common';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepositry: UserRepository,
        private readonly configService: ConfigService,
        private readonly common: Common,
        private readonly jwtService: JwtService,
    ) { }

    async signup(body: CreateUserDto) {
        try {
            const { email } = body;

            const existingUser = await this.userRepositry.findByEmail(email)
            if (existingUser) throw new ConflictException('User with this email already exist.')

            const saltRounds = 10
            const hasedPassword = await bcrypt.hash(body.password, saltRounds)

            const userData = {
                ...body,
                password: hasedPassword,
            };

            const user = await this.userRepositry.createUser(userData);
            const { password, ...userWithoutPassword } = user;

            return {
                status: HttpStatus.CREATED,
                message: 'User registered successfully.',
                data: userWithoutPassword
            };
        }

        catch (error) {
            console.log(error)
            if (error instanceof ConflictException) throw error;
            throw new BadRequestException('Failed to create user.');
        }
    }

    async login(body: LoginRequestDto) {
        try {
            const { email } = body;

            // Find user by email
            const user = await this.userRepositry.findByEmail(email);
            if (!user) throw new UnauthorizedException('Invalid email or password.');

            // Check if user is active
            if (!user.isActive) throw new UnauthorizedException('Account is deactivated. Please contact administrator.');

            // Compare password
            const isPasswordValid = await bcrypt.compare(body.password, user.password);
            if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password.');

            // Remove password from response
            const { password, ...userWithoutPassword } = user;
            const payload = {
                userId: user.id,
                userRole: user.userRole,
            }
            const accessToken = this.jwtService.sign(payload, {
                secret: this.configService.get('jwt.secret'),
                expiresIn: this.configService.get('jwt.expiresIn')
            });

            return {
                status: HttpStatus.OK,
                message: 'Login successful.',
                data: {
                    user: userWithoutPassword,
                    accessToken: accessToken
                }
            };

        } catch (error) {
            console.log(error);

            if (error instanceof UnauthorizedException) throw error;
            throw new BadRequestException('Login failed.');
        }
    }

    async forgotPassword(body: any) {
        try {
            const user = await this.userRepositry.findByEmail(body.email);
            if (!user) throw new BadRequestException('User with this email does not exist.');

            await this.common.sendMail(body.email, "FORGOT PASSWORD MAIL", "Please Check")

            return {
                status: 200,
                message: 'Password reset instructions sent to your email.',
            };

        } catch (error) {
            console.log(error);
            if (error instanceof ConflictException) throw error;
            throw new BadRequestException("Failed to send email.")
        }
    }
}