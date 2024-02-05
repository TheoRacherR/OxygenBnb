import { userMock } from "./user.mock"

export class UserServiceMock {
  findAll = jest.fn().mockResolvedValue(userMock)
  findOneById = jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(userMock.find(user=> user.id === id))
  })
  create = jest.fn().mockResolvedValue({ message: `User created` })
  update = jest.fn().mockResolvedValue({ message: `User 1 updated` })
  delete = jest.fn().mockResolvedValue({ message: `User 1 deleted` })

}