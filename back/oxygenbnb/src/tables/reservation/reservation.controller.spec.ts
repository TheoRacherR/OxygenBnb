import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { reservationMock, reservationMockCreate, reservationMockUpdate } from './mocks/reservation.mock';
import { ReservationServiceMock } from './mocks/reservation.service.mock';

describe('ReservationController', () => {
  let controller: ReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [{ provide: ReservationService, useClass: ReservationServiceMock }],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return one reservation', () => {
      const id = 1;
      const reservationFound = reservationMock.find((reservation) => reservation.id === id);
      expect(controller.findOneById(1)).resolves.toEqual(reservationFound);
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
  });

  describe('delete', () => {
    it('should return { message: `Reservation 1 deleted` }', () => {
      const id = 1;
      expect(controller.delete(id)).resolves.toEqual({
        message: `Reservation ${id} deleted`,
      });
    });
  });
});
