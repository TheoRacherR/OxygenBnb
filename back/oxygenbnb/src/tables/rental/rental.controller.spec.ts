import { Test, TestingModule } from '@nestjs/testing';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { rentalMock, rentalMockCreate, rentalMockUpdate } from './mocks/rental.mock';
import { rentalType } from './entities/rental.entity';
import { RentalServiceMock } from './mocks/rental.service.mock';

describe('RentalController', () => {
  let controller: RentalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalController],
      providers: [{ provide: RentalService, useClass: RentalServiceMock}],
    }).compile();

    controller = module.get<RentalController>(RentalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return one rental', () => {
      const id = 1;
      const r = rentalMock.find((r) => r.id === id);
      expect(controller.findOne(1)).resolves.toEqual(r);
    });
  });

  describe('findAllByUserId', () => {
    it('should return all rental of the user 1', () => {
      const user_id = 1;
      const r = rentalMock.find((r) => r.owner.id === user_id);
      expect(controller.findAllByUserId(1)).resolves.toEqual(r);
    });
  });

  // err
  describe('findAllByType', () => {
    it('should return all rental with the type "house"', () => {
      const type = rentalType.HOUSE;
      // const type = rentalType.HOUSE;
      const r = rentalMock.find((r) => r.type === type);
      expect(controller.findAllByType(type)).resolves.toEqual(r);
    });
  });

  describe('create', () => {
    it('should return { message: `Rental created` }', () => {
      expect(controller.create(rentalMockCreate[0])).resolves.toEqual({
        message: `Rental created`,
      });
    });
  });

  describe('update', () => {
    it('should return { message: `Rental 1 updated` }', () => {
      const id = 1;
      expect(controller.update(id, rentalMockUpdate[0])).resolves.toEqual({
        message: `Rental ${id} updated`,
      });
    });
  });

  describe('delete', () => {
    it('should return { message: `Rental 1 deleted` }', () => {
      const id = 1;
      expect(controller.delete(id)).resolves.toEqual({
        message: `Rental ${id} deleted`,
      });
    });
  });
});
