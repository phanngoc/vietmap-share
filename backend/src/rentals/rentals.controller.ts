import { Controller, Get, Post, Body, Param, Put, ParseIntPipe, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalStatusDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileInterceptor('paymentImage', {
      storage: diskStorage({
        destination: './uploads/payments',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new BadRequestException('Chỉ chấp nhận file ảnh (jpg, jpeg, png)'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createRentalDto: CreateRentalDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Rental> {
    if (file) {
      createRentalDto.paymentImage = file.path;
    }
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
