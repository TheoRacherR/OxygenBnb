import { Messages } from 'src/tables/messages/entities/messages.entity';
import { Rental } from 'src/tables/rental/entities/rental.entity';
import { User } from 'src/tables/user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (client) => client.conversation_client, {
    eager: true,
  })
  @JoinColumn()
  client: User;

  @ManyToOne(() => User, (renter) => renter.conversation_renter, {
    eager: true,
  })
  @JoinColumn()
  renter: User;

  @OneToMany(() => Messages, (messages) => messages.conversation, {
    cascade: ['insert'],
  })
  messages: Messages;

  @ManyToOne(() => Rental, (rental) => rental.conversation, {
    eager: true,
  })
  @JoinColumn()
  rental: Rental;
}
