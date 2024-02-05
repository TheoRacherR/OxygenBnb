import { RentalDate } from '../../rental-date/entities/rental-date.entity';
import { Reservation } from '../../reservation/entities/reservation.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum currency {
  EUR = '€ (euro)',
  PND = '£ (pound)',
  USD = '$ (us dollar)',
  YEN = '¥ (japan yen)',
  YUAN = 'Ұ (china yuan)',
  WON = '₩ (south-korean won)',
}

export enum rentalType {
  HOUSE = 'House',
  POOL = 'Pool',
  EXOTIC = 'Exotic',
}

export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  default_price: number;

  @Column({
    type: 'enum',
    enum: currency,
    nullable: true,
    default: null,
  })
  default_currency: currency;

  @Column({
    type: 'enum',
    enum: rentalType,
    nullable: true,
    default: null,
  })
  type: rentalType;

  @Column()
  localisation_infos: string;

  @Column({ default: false })
  isValid: boolean;

  // Relations

  @ManyToOne(() => User, (owner) => owner.rent)
  @JoinColumn()
  owner: User;

  @OneToMany(() => Reservation, (reservation) => reservation.rental)
  reservation: Reservation;

  @OneToMany(() => RentalDate, (date) => date.rental)
  date: RentalDate;
}
