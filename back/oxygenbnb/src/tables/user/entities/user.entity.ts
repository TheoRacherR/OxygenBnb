import { Rental } from "../../rental/entities/rental.entity";
import { Reservation } from "../../reservation/entities/reservation.entity";
import { UserInfo } from "../../user-info/entities/user-info.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

export enum userRole {
  USER = "user",
  RENTER = "renter",
  ADMIN = "admin",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: "enum",
    enum: userRole,
    default: userRole.USER,
  })
  role: userRole;


  // Relations

  @OneToOne(() => UserInfo, (info) => info.user, { cascade: true })
  info: UserInfo;

  @OneToMany(() => Rental, (rent) => rent.owner)
  rent: Rental;

  @OneToMany(() => Reservation, (reservation) => reservation.client)
  reservation: Reservation;
}
