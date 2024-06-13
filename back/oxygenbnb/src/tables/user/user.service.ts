import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from '../user-info/entities/user-info.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, userRole } from './entities/user.entity';
import { RegisterDto } from '../auth/dto/register-auth.dto';
import * as bcrypt from 'bcrypt';

export interface UsersFormated {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  created_at: Date;
  updated_at: Date;
  role: userRole;
}
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}

  async findAll(): Promise<UsersFormated[]> {
    const usersData = await this.userRepository.find();
    const usersDataFormated = usersData.map((item) => ({
      id: item.id,
      email: item.email,
      firstname: item.firstname,
      lastname: item.lastname,
      created_at: item.created_at,
      updated_at: item.updated_at,
      role: item.role,
    }));
    return usersDataFormated;
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(userInfo: RegisterDto): Promise<{ message: string }> {
    const newUserInfo = new UserInfo();
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(userInfo.password, salt);
    const newUser = await this.userRepository.save({
      ...userInfo,
      password: passwordHashed,
    });
    await this.userInfoRepository.insert({
      ...newUserInfo,
      user: newUser,
    });
    return { message: `User created` };
  }

  async update(id: number, user: UpdateUserDto): Promise<{ message: string }> {
    let newHashedPassword = user.password;
    if (user.password) {
      const newSalt = await bcrypt.genSalt();
      newHashedPassword = await bcrypt.hash(user.password, newSalt);
    }
    // const userToFind = await this.userRepository.findOne({
    //   where: { id : id },
    // });
    const userToUpdate = {
      ...user,
      password: newHashedPassword,
      // role: isAdmin ? user.role : userToFind.role
    };
    await this.userRepository.update(id, userToUpdate);
    return { message: `User ${id} updated` };
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.userRepository.delete(id);
    return { message: `User ${id} deleted` };
  }
}
