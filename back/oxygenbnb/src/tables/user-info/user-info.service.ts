import { Injectable } from '@nestjs/common';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './entities/user-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}

  async findOneByUserId(user_id: number): Promise<UserInfo> {
    return await this.userInfoRepository.findOne({
      where: {
        user: { id: user_id },
      },
    });
  }

  async update(
    user_id: number,
    userInfo: UpdateUserInfoDto,
  ): Promise<{ message: string }> {
    const userInfoToUpdate = await this.userInfoRepository.findOne({
      where: { user: { id: user_id } },
    });
    await this.userInfoRepository.update(userInfoToUpdate.id, userInfo);
    return { message: `UserInfo of user ${user_id} updated` };
  }
}
