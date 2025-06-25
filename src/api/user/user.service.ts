import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Like, Not } from 'typeorm';
import { UserRepository } from './user.repositry';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async create(user: CreateUserDto) {
        try {
            let sameEmail = await this.userRepository.findByEmail(user.email)
            if (sameEmail) throw new ConflictException("User already exist")
            else {
                await this.userRepository.createUser(user)
                return {
                    status: HttpStatus.CREATED,
                    message: 'User Created Successfully..!!'
                }
            }
        }
        catch (err) {
            if (err instanceof ConflictException) throw err;
            throw new BadRequestException("Somethig went wrong")
        }
    }

    async getAllUsers(search: string, page: number = 1, limit: number = 10) {
        try {
            const skip = (page - 1) * limit
            const where = search ? { email: Like(`%${search}%`) } : {}
            const [data, total] = await this.userRepository.findAndCount({ where, skip, take: limit, order: { createdAt: 'ASC' } })
            if (data.length > 0) {
                return {
                    status: HttpStatus.OK,
                    message: 'Users fetched successfully..!!',
                    data,
                    information: {
                        total,
                        page,
                        limit,
                        totalPages: Math.ceil(total / limit),
                    },
                };
            } else {
                throw new NotFoundException("User not found")
            }
        }
        catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException("Somethig went wrong")
        }
    }

    async getUserbyId(id: number) {
        try {
            let user = await this.userRepository.findOneBy({ id })
            console.log(user)
            if (!user) throw new NotFoundException("User not Found")

            return {
                status: HttpStatus.OK,
                message: 'User Fetched Successfully...!!',
                user
            }
        }
        catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException("Somethig went wrong")
        }
    }

    async deleteUserById(id: number) {
        try {
            let user = await this.userRepository.findOneBy({ id })
            if (!user) throw new NotFoundException("User not Found")
            await this.userRepository.delete(id)
            return {
                status: HttpStatus.OK,
                message: 'User deleted successfully...!!',
            }
        }
        catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException("Somethig went wrong")
        }
    }

    async updateUserById(id: number, body: UpdateUserDto) {
        try {
            let user = await this.userRepository.findOneBy({ id })

            if (!user) throw new NotFoundException("User not Found")

            if (body.email) {
                let user = await this.userRepository.findOne({
                    where: {
                        email: body.email,
                        id: Not(id)
                    }
                })
                if (user) {
                    return {
                        message: 'User already exist with same E-mail address... Please try another E-mail address!!'
                    }
                }
            }

            const result = await this.userRepository.update(id, body)
            console.log('Result:', result)
            console.log('Affected Rows:', result.affected)
            return {
                status: HttpStatus.OK,
                message: 'User updated successfully...!!',
            }
        }
        catch (err) {
            if (err instanceof NotFoundException) throw err;
            throw new BadRequestException("Somethig went wrong")
        }

    }
}
