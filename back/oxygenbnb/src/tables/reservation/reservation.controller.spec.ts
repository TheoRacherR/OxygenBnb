import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import {
  reservationMock,
  reservationMockCreate,
  reservationMockUpdate,
} from './mocks/reservation.mock';
import { ReservationServiceMock } from './mocks/reservation.service.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ReservationController', () => {
  let controller: ReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        { provide: ReservationService, useClass: ReservationServiceMock },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return one reservation', () => {
      const id = 1;
      const reservationFound = reservationMock.find(
        (reservation) => reservation.id === id,
      );
      expect(controller.findOneById(1)).resolves.toEqual(reservationFound);
    });

    const id_not_found = 0;
    it(`should return an error : { Reservation ${id_not_found} not found }`, () => {
      expect(controller.findOneById(id_not_found)).rejects.toThrow(
        new HttpException(
          `Reservation ${id_not_found} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('findByClientId', () => {
    it('should return one reservation', () => {
      const client_id = 1;
      const reservationFound = reservationMock.find(
        (reservation) => reservation.client.id === client_id,
      );
      expect(controller.findByClientId(client_id)).resolves.toEqual(
        reservationFound,
      );
    });

    const client_id_not_found = 0;
    it(`should return an error : { No Reservation where found of the client ${client_id_not_found} }`, () => {
      expect(controller.findByClientId(client_id_not_found)).rejects.toThrow(
        new HttpException(
          `No Reservation where found of the client ${client_id_not_found}`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('findByRentalId', () => {
    it('should return one reservation', () => {
      const client_id = 1;
      const reservationFound = reservationMock.find(
        (reservation) => reservation.rental.id === client_id,
      );
      expect(controller.findByRentalId(client_id)).resolves.toEqual(
        reservationFound,
      );
    });

    const rental_id_not_found = 0;
    it(`should return an error : { No Reservation where found of the client ${rental_id_not_found} }`, () => {
      expect(controller.findByRentalId(rental_id_not_found)).rejects.toThrow(
        new HttpException(
          `No Reservation where found of the rental ${rental_id_not_found}`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('create', () => {
    it('should return { message: `Reservation created` }', () => {
      expect(controller.create(reservationMockCreate[0])).resolves.toEqual({
        message: `Reservation created`,
      });
    });
  });

  describe('update', () => {
    it('should return { message: `Reservation 1 updated` }', () => {
      const id = 1;
      expect(controller.update(id, reservationMockUpdate[0])).resolves.toEqual({
        message: `Reservation ${id} updated`,
      });
    });

    const id_not_found = 0;
    it(`should return an error : { Reservation ${id_not_found} not found }`, () => {
      expect(
        controller.update(id_not_found, reservationMockUpdate[0]),
      ).rejects.toThrow(
        new HttpException(
          `Reservation ${id_not_found} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('delete', () => {
    it('should return { message: `Reservation 1 deleted` }', () => {
      const id = 1;
      expect(controller.delete(id)).resolves.toEqual({
        message: `Reservation ${id} deleted`,
      });
    });

    const id_not_found = 0;
    it(`should return an error : { Reservation ${id_not_found} not found }`, () => {
      expect(controller.delete(id_not_found)).rejects.toThrow(
        new HttpException(
          `Reservation ${id_not_found} not found`,
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
