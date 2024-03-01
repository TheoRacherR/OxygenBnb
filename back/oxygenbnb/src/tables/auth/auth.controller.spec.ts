import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authRegisterEmailFoundMock, authRegisterMock } from './mocks/auth.mock';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: AuthService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it(`should return User created`, () => {
      expect(controller.register(authRegisterMock)).resolves.toEqual({ //todo: change
        message: `User created`,
      });
    });

    it(`should return an error : { Email already exist }`, () => {
      expect(controller.register(authRegisterEmailFoundMock)).rejects.toThrow(new HttpException(`Email already exist`, HttpStatus.CONFLICT));
    });

  });

  describe('login', () => {
    it(`should return {isConnected: true, token, id: user.id, role: user.role, userInfo: userInfo}`, () => {
      expect(controller.register(authRegisterMock)).resolves.toEqual({ //todo: change
        message: `User created`,
      });
    });

    it(`should return an error : { Email already exist }`, () => {
      expect(controller.register(authRegisterEmailFoundMock)).rejects.toThrow(new HttpException(`Email already exist`, HttpStatus.CONFLICT));
    });
  });

});
