import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserDbMock } from './mocks/User.db.mock';
import { userMock } from './mocks/user.mock';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

// TODO

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: getRepositoryToken(User), useValue: userMock}],
    }).compile();

    service = await module.get(UserService);
    // service = module.get<UserService>(UserService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of product', async () => {
      const findAll = jest.spyOn(UserDbMock.user, 'findAll');
      const fa = await service.findAll();
      expect(fa).toEqual(findAll);
      expect(fa).toHaveBeenCalledTimes(1);
      // expect(service.findAll()).resolves.toEqual(userMock)
    })
  })

  describe('findOneById', () => {
    it('should return an array of product', () => {
      const id  = 1;
      jest.spyOn(UserDbMock.user, 'findOneById').mockResolvedValue(userMock[0])
      expect(service.findOneById(id)).resolves.toEqual(userMock[0])
    })
    it('should throw a not found exception', () => {
      const id  = 1;
      jest.spyOn(UserDbMock.user, 'findOneById').mockResolvedValue(undefined)
      expect(() => service.findOneById(id)).rejects.toBeInstanceOf(NotFoundException)
      expect(() => service.findOneById(id)).rejects.toEqual(new NotFoundException('Not Found'))
    })
  })

  describe('create', () => {
    it('should return { message: `User created` }', () => {
      expect(service.create(userMock[0])).resolves.toEqual({ message: `User created` })
    })
  })

  describe('update', () => {
    it('should return { message: `User 1 updated` }', () => {
      const id  = 1;
      jest.spyOn(UserDbMock.user, 'findOneById').mockResolvedValue(userMock[0])
      expect(service.update(id, userMock[0])).resolves.toEqual({ message: `User ${id} updated` })
    })
    it('should throw a not found exception', () => {
      const id  = 1;
      jest.spyOn(UserDbMock.user, 'findOneById').mockResolvedValue(undefined)
      expect(() => service.update(id, userMock[0])).rejects.toBeInstanceOf(NotFoundException)
      expect(() => service.update(id, userMock[0])).rejects.toEqual(new NotFoundException('Not Found'))
    })
  })

  describe('delete', () => {
    it('should return { message: `User 1 deleted` }', () => {
      const id  = 1;
      jest.spyOn(UserDbMock.user, 'findOneById').mockResolvedValue(userMock[0])
      expect(service.delete(id)).resolves.toEqual({ message: `User ${id} deleted` })
    })
    it('should throw a not found exception', () => {
      const id  = 1;
      jest.spyOn(UserDbMock.user, 'findOneById').mockResolvedValue(undefined)
      expect(() => service.delete(id)).rejects.toBeInstanceOf(NotFoundException)
      expect(() => service.delete(id)).rejects.toEqual(new NotFoundException('Not Found'))
    })
  })
});
