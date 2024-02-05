import { userMock } from "./user.mock";

export const UserDbMock = {
  user : {
    findAll: jest.fn().mockResolvedValue(userMock),
    findOneById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}