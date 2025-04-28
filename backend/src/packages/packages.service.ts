import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  async findAll(): Promise<Package[]> {
    return this.packageRepository.find({ 
      where: { isActive: true },
      order: { duration: 'ASC' }
    });
  }

  async findOne(id: number): Promise<Package> {
    const pkg = await this.packageRepository.findOne({ where: { id } });
    if (!pkg) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return pkg;
  }

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    const newPackage = this.packageRepository.create(createPackageDto);
    return this.packageRepository.save(newPackage);
  }

  async update(id: number, updatePackageDto: Partial<CreatePackageDto>): Promise<Package> {
    await this.packageRepository.update(id, updatePackageDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.packageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
  }
}
