import { Rental } from '../../rental/entities/rental.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ default: false })
  canceled: Boolean;

  // Relations

  @ManyToOne(() => User, (client) => client.reservation)
  @JoinColumn()
  client: User;

  @ManyToOne(() => Rental, (rental) => rental.reservation)
  @JoinColumn()
  rental: Rental;
}
