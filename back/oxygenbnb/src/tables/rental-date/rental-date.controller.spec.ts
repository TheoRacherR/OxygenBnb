import { Test, TestingModule } from '@nestjs/testing';
import { RentalDateController } from './rental-date.controller';
import { RentalDateService } from './rental-date.service';
import { rentalDateMock, rentalDateMockCreate, rentalDateMockUpdate } from './mocks/rental-date.mock';
import { rentalDateType } from './entities/rental-date.entity';
import { RentalDateServiceMock } from './mocks/Rental-date.service.mock';

describe('RentalDateController', () => {
  let controller: RentalDateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalDateController],
      providers: [{ provide: RentalDateService, useClass: RentalDateServiceMock }],
    }).compile();

    controller = module.get<RentalDateController>(RentalDateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllByRentalId', () => {
    it('should return all rental of the user 1', () => {
      const rental_id = 1;
      const rentalDateFound = rentalDateMock.find((rd) => rd.rental.id === rental_id);
      expect(controller.findAllByRentalId(1)).resolves.toEqual(rentalDateFound);
    });
  });

  describe('findAllByType', () => {
    it('should return all rental with the type "house"', () => {
      const type = rentalDateType.BLOCKED;
      const rentalDateFound = rentalDateMock.find((rd) => rd.type === type);
      expect(controller.findAllByType(type)).resolves.toEqual(rentalDateFound);
    });
  });

  describe('findOneById', () => {
    it('should return one rental', () => {
      const id = 1;
      const rentalDateFound = rentalDateMock.find((rd) => rd.id === id);
      expect(controller.findOneById(1)).resolves.toEqual(rentalDateFound);
    });
  });

  describe('create', () => {
    it('should return {message: "RentalDate created"}', () => {
      expect(controller.create(rentalDateMockCreate[0])).resolves.toEqual({
        message: `RentalDate created`,
      });
    });
  });

  describe('update', () => {
    it('should return { message: `RentalDate 1 updated`}', () => {
      const id = 1;
      expect(controller.update(id, rentalDateMockUpdate[0])).resolves.toEqual({
        message: `RentalDate ${id} updated`,
      });
    });
  });

  describe('delete', () => {
    it('should return { message: `RentalDate 1 deleted`}', () => {
      const id = 1;
      expect(controller.delete(id)).resolves.toEqual({
        message: `RentalDate ${id} deleted`,
      });
    });
  });
});
