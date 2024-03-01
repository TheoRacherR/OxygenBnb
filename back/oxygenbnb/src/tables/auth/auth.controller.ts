import {
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { TokenValidateDto } from './dto/tokenValidation-auth.dto ';
import { userRole } from '../user/entities/user.entity';
import { UserInfo } from '../user-info/entities/user-info.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('validateToken')
  public validateToken(
    @Body(ValidationPipe) TokenValidateDto: TokenValidateDto,
  ) {
    return this.authService.validateToken(TokenValidateDto);
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  public login(@Body(ValidationPipe) LoginDto: LoginDto): Promise<{ 
    isConnected: boolean,
    token: any,
    id: number,
    role: userRole,
    userInfo: UserInfo 
  }> {
    return this.authService.login(LoginDto);
  }
}
