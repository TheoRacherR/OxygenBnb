/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { TokenValidateDto } from './dto/tokenValidation-auth.dto ';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('verifyToken')
  public verifyToken(@Headers() TokenValidateDto: TokenValidateDto) {
    return this.authService.verifyToken(TokenValidateDto);
  }

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
  public login(@Body(ValidationPipe) LoginDto: LoginDto): Promise<string> {
    return this.authService.login(LoginDto);
  }
}
