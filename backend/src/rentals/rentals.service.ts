import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, LessThan } from 'typeorm';
import { Rental } from './entities/rental.entity';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalStatusDto } from './dto/update-rental.dto';
import { AccountsService } from '../accounts/accounts.service';
import { PackagesService } from '../packages/packages.service';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental)
    private readonly rentalRepository: Repository<Rental>,
    private readonly accountsService: AccountsService,
    private readonly packagesService: PackagesService,
  ) {}

  async findAll(): Promise<Rental[]> {
    return this.rentalRepository.find({
      relations: ['package', 'account'],
    });
  }

  async findOne(id: number): Promise<Rental> {
    const rental = await this.rentalRepository.findOne({
      where: { id },
      relations: ['package', 'account'],
    });

    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Rental[]> {
    return this.rentalRepository.find({
      where: { phoneNumber },
      relations: ['package', 'account'],
    });
  }

  async create(createRentalDto: CreateRentalDto): Promise<Rental> {
    // Find package
    const packageEntity = await this.packagesService.findOne(createRentalDto.packageId);

    // Check for available account
    const availableAccount = await this.accountsService.findAvailableAccount();
    if (!availableAccount) {
      throw new BadRequestException('No available accounts at the moment. Please try again later.');
    }

    // Calculate start and end dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + packageEntity.duration);

    // Create rental
    const newRental = this.rentalRepository.create({
      customerName: createRentalDto.customerName,
      phoneNumber: createRentalDto.phoneNumber,
      email: createRentalDto.email,
      paymentStatus: 'pending',
      startDate,
      endDate,
      package: packageEntity,
      account: availableAccount,
      paymentImage: createRentalDto.paymentImage,
    });

    return this.rentalRepository.save(newRental);
  }

  async updatePaymentStatus(id: number, updateRentalStatusDto: UpdateRentalStatusDto): Promise<Rental> {
    const rental = await this.findOne(id);

    // If payment is completed, mark account as rented
    if (updateRentalStatusDto.paymentStatus === 'completed' && rental.paymentStatus !== 'completed') {
      await this.accountsService.markAccountAsRented(rental.account.id);
    }

    // Update rental
    rental.paymentStatus = updateRentalStatusDto.paymentStatus;
    if (updateRentalStatusDto.paymentReference) {
      rental.paymentReference = updateRentalStatusDto.paymentReference;
    }

    return this.rentalRepository.save(rental);
  }

  async endRental(id: number): Promise<void> {
    const rental = await this.findOne(id);

    // Mark account as available again
    await this.accountsService.markAccountAsAvailable(rental.account.id);
  }

  async getActiveRentals(): Promise<Rental[]> {
    const now = new Date();
    return this.rentalRepository.find({
      where: {
        paymentStatus: 'completed',
        endDate: MoreThan(now)
      },
      relations: ['package', 'account'],
    });
  }

  async getExpiredRentals(): Promise<Rental[]> {
    const now = new Date();
    return this.rentalRepository.find({
      where: {
        paymentStatus: 'completed',
        endDate: LessThan(now)
      },
      relations: ['package', 'account'],
    });
  }
}
