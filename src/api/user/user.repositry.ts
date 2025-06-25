import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    // Example of a reusable custom query method
    async findByEmail(email: string): Promise<User | null> {
        return await this.findOne({ where: { email } });
    }

    // async findUsersByPhoneNumber(mob_no: string): Promise<User[]> {
    //     return await this.find({ where: { mob_no } });
    // }

    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.create(userData);
        return await this.save(user);
    }
}