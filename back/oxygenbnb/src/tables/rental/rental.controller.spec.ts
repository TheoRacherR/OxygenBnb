import { Test, TestingModule } from '@nestjs/testing';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { rentalMock, rentalMockCreate, rentalMockUpdate } from './mocks/rental.mock';
import { rentalType } from './entities/rental.entity';
import { RentalServiceMock } from './mocks/rental.service.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  //error
  describe('findOne', () => {
    it('should return one rental', () => {
      const id = 1;
      const rentalFound = rentalMock.find((rental) => rental.id === id);
      expect(controller.findOne(1)).resolves.toEqual(rentalFound);
    });

    const id_not_found = 0;
    it(`should return an error : { No Rental for id ${id_not_found} where found }`, () => {
      expect(controller.findOne(id_not_found)).rejects.toThrow(new HttpException(`No Rental for id ${id_not_found} where found`, HttpStatus.NOT_FOUND));
    });
  });

  //error
  describe('findAllByUserId', () => {
    it('should return all rental of the user 1', () => {
      const user_id = 1;
      const rentalsFound = rentalMock.find((rental) => rental.owner.id === user_id);
      expect(controller.findAllByUserId(1)).resolves.toEqual(rentalsFound);
    });

    const user_id_not_found = 0;
    it(`should return an error : { No Rental for user ${user_id_not_found} where found }`, () => {
      expect(controller.findAllByUserId(user_id_not_found)).rejects.toThrow(new HttpException(`No Rental for user ${user_id_not_found} where found`, HttpStatus.NOT_FOUND));
    });
  });

  describe('findAllByType', () => {
    it('should return all rental with the type "house"', () => {
      const type = rentalType.HOUSE;
      const rentalsFound = rentalMock.find((rental) => rental.type === type);
      expect(controller.findAllByType(type)).resolves.toEqual(rentalsFound);
    });
  });

  describe('create', () => {
    it('should return { message: `Rental created` }', () => {
      expect(controller.create(rentalMockCreate[0])).resolves.toEqual({
        message: `Rental created`,
      });
    });
  });

  //error
  describe('update', () => {
    it('should return { message: `Rental 1 updated` }', () => {
      const id = 1;
      expect(controller.update(id, rentalMockUpdate[0])).resolves.toEqual({
        message: `Rental ${id} updated`,
      });
    });

    const id_not_found = 0;
    it(`should return an error : { No Rental ${id_not_found} where found }`, () => {
      expect(controller.update(id_not_found, rentalMockUpdate[0])).rejects.toThrow(new HttpException(`No Rental ${id_not_found} where found`, HttpStatus.NOT_FOUND));
    });
  });

  //error
  describe('delete', () => {
    it('should return { message: `Rental 1 deleted` }', () => {
      const id = 1;
      expect(controller.delete(id)).resolves.toEqual({
        message: `Rental ${id} deleted`,
      });
    });

    const id_not_found = 0;
    it(`should return an error : { No Rental ${id_not_found} where found }`, () => {
      expect(controller.delete(id_not_found)).rejects.toThrow(new HttpException(`No Rental ${id_not_found} where found`, HttpStatus.NOT_FOUND));
    });
  });


});
