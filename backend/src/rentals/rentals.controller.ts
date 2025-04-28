import { Controller, Get, Post, Body, Param, Put, ParseIntPipe, Query } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalStatusDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  findAll(): Promise<Rental[]> {
    return this.rentalsService.findAll();
  }

  @Get('active')
  getActive(): Promise<Rental[]> {
    return this.rentalsService.getActiveRentals();
  }

  @Get('expired')
  getExpired(): Promise<Rental[]> {
    return this.rentalsService.getExpiredRentals();
  }

  @Get('phone/:phoneNumber')
  findByPhone(@Param('phoneNumber') phoneNumber: string): Promise<Rental[]> {
    return this.rentalsService.findByPhoneNumber(phoneNumber);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Rental> {
    return this.rentalsService.findOne(id);
  }

  @Post()
  create(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalsService.create(createRentalDto);
  }

  @Put(':id/payment')
  updatePayment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRentalStatusDto: UpdateRentalStatusDto,
  ): Promise<Rental> {
    return this.rentalsService.updatePaymentStatus(id, updateRentalStatusDto);
  }

  @Put(':id/end')
  endRental(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.rentalsService.endRental(id);
  }
}
