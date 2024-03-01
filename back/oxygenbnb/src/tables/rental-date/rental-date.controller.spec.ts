import { Test, TestingModule } from '@nestjs/testing';
import { RentalDateController } from './rental-date.controller';
import { RentalDateService } from './rental-date.service';
import { rentalDateMock, rentalDateMockCreate, rentalDateMockUpdate } from './mocks/rental-date.mock';
import { rentalDateType } from './entities/rental-date.entity';
import { RentalDateServiceMock } from './mocks/Rental-date.service.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

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
      const rentalDateFound = rentalDateMock.find((rentalDate) => rentalDate.rental.id === rental_id);
      expect(controller.findAllByRentalId(1)).resolves.toEqual(rentalDateFound);
    });

    const rental_id_not_found = 0;
    it(`should return an error : { No Rental date for rental_id ${rental_id_not_found} where found }`, () => {
      expect(controller.findAllByRentalId(rental_id_not_found)).rejects.toThrow(new HttpException(`No Rental date for rental_id ${rental_id_not_found} where found`, HttpStatus.NOT_FOUND));
    });
  });

  describe('findAllByType', () => {
    it('should return all rental with the type "house"', () => {
      const type = rentalDateType.BLOCKED;
      const rentalDateFound = rentalDateMock.find((rentalDate) => rentalDate.type === type);
      expect(controller.findAllByType(type)).resolves.toEqual(rentalDateFound);
    });
  });

  describe('findOneById', () => {
    it('should return one rental', () => {
      const id = 1;
      const rentalDateFound = rentalDateMock.find((rentalDate) => rentalDate.id === id);
      expect(controller.findOneById(1)).resolves.toEqual(rentalDateFound);
    });
  });

  describe('create', () => {
    it('should return {message: "RentalDate created"}', () => {
      expect(controller.create(rentalDateMockCreate[0])).resolves.toEqual({ //todo: change
        message: `RentalDate created`,
      });
    });
  });

  describe('update', () => {
    it('should return { message: `RentalDate 1 updated`}', () => {
      const id = 1;
      expect(controller.update(id, rentalDateMockUpdate)).resolves.toEqual({
        message: `RentalDate ${id} updated`,
      });
    });

    const id_not_found = 0;
    it(`should return an error : { No Rental date for rental_id ${id_not_found} where found }`, () => {
      expect(controller.update(id_not_found, rentalDateMockUpdate)).rejects.toThrow(new HttpException(`No Rental date ${id_not_found} where found`, HttpStatus.NOT_FOUND));
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

  const id_not_found = 0;
    it(`should return an error : { No Rental date for rental_id ${id_not_found} where found }`, () => {
      expect(controller.delete(id_not_found)).rejects.toThrow(new HttpException(`No Rental date ${id_not_found} where found`, HttpStatus.NOT_FOUND));
    });
});
