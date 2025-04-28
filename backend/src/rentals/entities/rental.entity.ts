import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Package } from '../../packages/entities/package.entity';
import { Account } from '../../accounts/entities/account.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  paymentStatus: string; // 'pending', 'completed', 'failed'

  @Column({ nullable: true })
  paymentReference: string; // Mã giao dịch

  @Column({ nullable: true })
  paymentImage: string; // Đường dẫn đến ảnh chuyển khoản

  @Column({ type: 'datetime' })
  startDate: Date;

  @Column({ type: 'datetime' })
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Package, pkg => pkg.rentals)
  @JoinColumn()
  package: Package;

  @ManyToOne(() => Account, account => account.rentals)
  @JoinColumn()
  account: Account;
} 