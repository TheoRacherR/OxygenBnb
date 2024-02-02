import { Test, TestingModule } from '@nestjs/testing';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import { UserInfoServiceMock } from './mocks/UserInfo.service.mock';
import { userInfoMockList, userInfoMockToUpdate } from './mocks/userinfo.mock';

describe('UserInfoController', () => {
  let controller: UserInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserInfoController],
      providers: [{provide: UserInfoService, useClass: UserInfoServiceMock}],
    }).compile();

    controller = module.get<UserInfoController>(UserInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("findOneByUserId", () => {
  it("should return one user", () => {
      const id = 1;
      const userInfoFound = userInfoMockList.find(userInfo => userInfo.user.id === id)
      expect(controller.findOneByUserId(1)).resolves.toEqual(userInfoFound)
    })
  });

  describe("update", () => {
    it('should return { message: `UserInfo of user 1 updated` }', () => {
      const user_id = 1;
      expect(controller.update(user_id, userInfoMockToUpdate[0])).resolves.toEqual({
        message: `UserInfo of user ${user_id} updated`,
      });
    });
  })
});
