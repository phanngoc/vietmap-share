import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rental } from '../../rentals/entities/rental.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number; // Số ngày

  @Column()
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Rental, rental => rental.package)
  rentals: Rental[];
} 