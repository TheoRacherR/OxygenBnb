import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserServiceMock } from './mocks/User.service.mock';
import { userMock } from './mocks/user.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useClass: UserServiceMock }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of user', () => {
      expect(controller.findAll()).resolves.toEqual(userMock);
    });
  });

  describe('findOneById', () => {
    it('should return one user', () => {
      const id = 1;
      const userFound = userMock.find((user) => user.id === id);
      expect(controller.findOneById(id)).resolves.toEqual(userFound);
    });

    const id_not_found = 0;
    it(`should return an error : { User ${id_not_found} not found }`, () => {
      expect(controller.findOneById(id_not_found)).rejects.toThrow(
        new HttpException(
          `User ${id_not_found} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('update', () => {
    const id = 1;
    it(`should return { message: User ${id} updated }`, () => {
      expect(controller.update(id, userMock[0])).resolves.toEqual({
        message: `User ${id} updated`,
      });
    });

    const id_not_found = 0;
    it(`should return an error : { User ${id_not_found} not found }`, () => {
      expect(controller.update(id_not_found, userMock[0])).rejects.toThrow(
        new HttpException(
          `User ${id_not_found} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('delete', () => {
    const id = 1;
    it(`should return { message: User ${id} deleted }`, () => {
      expect(controller.delete(id)).resolves.toEqual({
        message: `User ${id} deleted`,
      });
    });

    const id_not_found = 0;
    it(`should return an error : { User ${id_not_found} not found }`, () => {
      expect(controller.delete(id_not_found)).rejects.toThrow(
        new HttpException(
          `User ${id_not_found} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
