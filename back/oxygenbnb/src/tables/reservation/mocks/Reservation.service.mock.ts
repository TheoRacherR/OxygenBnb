import { reservationMock } from "./reservation.mock";

export class ReservationServiceMock {
  findOneById = jest.fn().mockImplementation((id: number) => {
    return Promise.resolve(reservationMock.find(resa => resa.id === id))
  });
  findByClientId = jest.fn().mockImplementation((client_id: number) => {
    return Promise.resolve(reservationMock.find(resa => resa.client.id === client_id))
  });
  findByRentalId = jest.fn().mockImplementation((rental_id: number) => {
    return Promise.resolve(reservationMock.find(resa => resa.rental.id === rental_id))
  });
  create = jest.fn().mockResolvedValue({ message: `Reservation created` });
  update = jest.fn().mockResolvedValue({ message: `Reservation 1 updated` });
  delete = jest.fn().mockResolvedValue({ message: `Reservation 1 deleted` });
}