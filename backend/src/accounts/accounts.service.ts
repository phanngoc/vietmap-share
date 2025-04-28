import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const newAccount = this.accountRepository.create(createAccountDto);
    return this.accountRepository.save(newAccount);
  }

  async update(id: number, updateAccountDto: Partial<CreateAccountDto>): Promise<Account> {
    await this.accountRepository.update(id, updateAccountDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.accountRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
  }

  async findAvailableAccount(): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: { isAvailable: true },
      order: { lastRentedAt: 'ASC' },
    });
  }

  async markAccountAsRented(id: number): Promise<Account> {
    const account = await this.findOne(id);
    account.isAvailable = false;
    account.lastRentedAt = new Date();
    return this.accountRepository.save(account);
  }

  async markAccountAsAvailable(id: number): Promise<Account> {
    const account = await this.findOne(id);
    account.isAvailable = true;
    return this.accountRepository.save(account);
  }
}
