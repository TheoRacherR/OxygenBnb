import { Rental } from '../../rental/entities/rental.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum rentalDateType {
  BLOCKED = 'blocked',
  RENTED = 'rented',
}

@Entity()
export class RentalDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: rentalDateType,
    default: rentalDateType.BLOCKED,
  })
  type: rentalDateType;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  // Relations

  @OneToOne(() => Rental, (rental) => rental.date, { onDelete: 'CASCADE' })
  @JoinColumn()
  rental: Rental;
}
