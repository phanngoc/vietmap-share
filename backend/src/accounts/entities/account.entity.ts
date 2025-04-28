import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rental } from '../../rentals/entities/rental.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  lastRentedAt: Date;

  @OneToMany(() => Rental, rental => rental.account)
  rentals: Rental[];
} 