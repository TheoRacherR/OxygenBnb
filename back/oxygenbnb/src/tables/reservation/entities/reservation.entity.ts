import { Rental } from '../../rental/entities/rental.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ default: false })
  canceled: boolean;

  @Column({ default: 0 })
  nb_adult: number;

  @Column({ default: 0 })
  nb_children: number;

  @Column({ default: 0 })
  price_per_night: number;

  @Column({ default: 0 })
  total_fees: number;

  @Column({ default: 0 })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 0 })
  nb_night: number;

  // Relations

  @ManyToOne(() => User, (client) => client.reservation, { eager: true })
  @JoinColumn()
  client: User;

  @ManyToOne(() => Rental, (rental) => rental.reservation, { eager: true })
  @JoinColumn()
  rental: Rental;
}
