import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserInfo } from '../user-info/entities/user-info.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, userRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(user: CreateUserDto): Promise<{ message: string }> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    const newUserInfo = new UserInfo();
    this.userRepository.create({
      ...user,
      password: hashedPassword,
      info: newUserInfo,
    });
    return { message: `User created` };
  }

  async update(id: number, user: UpdateUserDto): Promise<{ message: string }> {
    let newHashedPassword = user.password;
    if (user.password) {
      const newSalt = await bcrypt.genSalt();
      newHashedPassword = await bcrypt.hash(user.password, newSalt);
    }
    await this.userRepository.update(id, {
      ...user,
      password: newHashedPassword,
    });
    return { message: `User ${id} updated` };
  }

  // async updateRole(id: number, role: userRole): Promise<User> {
  //   await this.userRepository.update(id, { role });
  //   return await this.userRepository.findOne({ where: { id } });
  // }

  async delete(id: number): Promise<{ message: string }> {
    await this.userRepository.delete(id);
    return { message: `User ${id} deleted` };
  }
}