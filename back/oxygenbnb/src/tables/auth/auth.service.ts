import {
  HttpException,
  HttpStatus,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserInfoService } from '../user-info/user-info.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, userRole } from '../user/entities/user.entity';
import { LoginDto } from './dto/login-auth.dto';
import { TokenValidateDto } from './dto/tokenValidation-auth.dto ';
import { JsonWebTokenError } from 'jsonwebtoken';
import { UserInfo } from '../user-info/entities/user-info.entity';
import { RegisterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private userInfoService: UserInfoService,
    private jwtService: JwtService,
  ) {}

  async validateToken(TokenValidateDto: TokenValidateDto) {
    if (!TokenValidateDto.token) {
      throw new BadRequestException('Token is missing');
    }

    try {
      const { id } = this.jwtService.verify(TokenValidateDto.token);
      const user: User = await this.userService.findOneById(id);
      const detail: UserInfo = await this.userInfoService.findOneByUserId(id);

      if (!user) {
        throw new BadRequestException('Invalid user');
      }

      const userInfo = detail;

      return {
        isConnected: true,
        id: user.id,
        role: user.role,
        isAdmin: user.role === userRole.ADMIN,
        userInfo: userInfo,
      };
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid token');
      }

      throw error;
    }
  }

  async login(LoginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(LoginDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const detail = await this.userInfoService.findOneByUserId(user.id);

    const isValidPassword = await bcrypt.compare(
      LoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      id: user.id,
    };

    console.log("process.env.jwt_secret: " + process.env.jwt_secret)

    const token = this.jwtService.sign(payload);

    const userInfo = detail;

    return {
      isConnected: true,
      token,
      id: user.id,
      role: user.role,
      userInfo: userInfo,
    };
  }

  async register(registerDto: RegisterDto): Promise<{ message: string }>  {
    const userFound = await this.userService.findOneByEmail(registerDto.email);
    if (userFound)
      throw new HttpException('Email already exist', HttpStatus.CONFLICT);
    return await this.userService.create(registerDto);
  }
}
