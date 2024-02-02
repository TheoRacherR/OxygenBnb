import { userInfoMockList } from "./userinfo.mock"

export class UserInfoServiceMock {
  findOneByUserId = jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(userInfoMockList.find(u => u.user.id === id))
  })
  update = jest.fn().mockResolvedValue({ message: `UserInfo of user 1 updated` })
}