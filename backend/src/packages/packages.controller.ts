import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { Package } from './entities/package.entity';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Get()
  findAll(): Promise<Package[]> {
    return this.packagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Package> {
    return this.packagesService.findOne(id);
  }

  @Post()
  create(@Body() createPackageDto: CreatePackageDto): Promise<Package> {
    return this.packagesService.create(createPackageDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePackageDto: Partial<CreatePackageDto>,
  ): Promise<Package> {
    return this.packagesService.update(id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.packagesService.remove(id);
  }
}
