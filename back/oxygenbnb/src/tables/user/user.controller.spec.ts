import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserServiceMock } from './mocks/User.service.mock';
import { userMock } from './mocks/user.mock';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{provide: UserService, useClass: UserServiceMock}],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should retrun an array of user", () => {
      expect(controller.findAll()).resolves.toEqual(userMock)
    })
  })

  describe("findOneById", () => {
    it("should retrun one user", () => {
      const id = 1;
      const u = userMock.find(u => u.id === id)
      expect(controller.findOneById(1)).resolves.toEqual(u)
    })
  })

  describe("create", () => {
    it("should return { message: `User created` }", () => {
      expect(controller.create(userMock[0])).resolves.toEqual({ message: `User created` })
    })
  })

  describe("update", () => {
    it("should return { message: `User 1 updated` }", () => {
      const id = 1;
      expect(controller.update(id, userMock[0])).resolves.toEqual({ message: `User ${id} updated` })
    })
  })

  describe("delete", () => {
    it("should return { message: `User 1 deleted` }", () => {
      const id = 1;
      expect(controller.delete(id)).resolves.toEqual({ message: `User ${id} deleted` })
    })
  })
});
