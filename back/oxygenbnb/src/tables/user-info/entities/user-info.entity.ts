import { User } from '../../user/entities/user.entity';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

export enum gender {
  MAN = 'man',
  WOMAN = 'woman',
  OTHER = 'other',
}

@Entity()
export class UserInfo {

  @Column({
    type: 'enum',
    enum: gender,
    default: gender.MAN,
  })
  gender: gender;

  @Column({
    nullable: true,
    default: null,
  })
  birth_date: Date;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  desciption: string;

  // Relations

  @OneToOne(() => User, (user) => user.info, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
