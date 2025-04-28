import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { Rental } from './entities/rental.entity';
import { AccountsModule } from '../accounts/accounts.module';
import { PackagesModule } from '../packages/packages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental]),
    AccountsModule,
    PackagesModule,
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}
