import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PackagesService } from '../packages/packages.service';
import { AccountsService } from '../accounts/accounts.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const packagesService = app.get(PackagesService);
  const accountsService = app.get(AccountsService);

  // Seed packages
  const packages = [
    {
      name: 'Gói 1 ngày',
      duration: 1,
      price: 10000,
      description: 'Gói thuê tài khoản VietMap Live trong 1 ngày'
    },
    {
      name: 'Gói 3 ngày',
      duration: 3,
      price: 25000,
      description: 'Gói thuê tài khoản VietMap Live trong 3 ngày'
    },
    {
      name: 'Gói 7 ngày',
      duration: 7,
      price: 50000,
      description: 'Gói thuê tài khoản VietMap Live trong 7 ngày'
    }
  ];

  for (const pkg of packages) {
    await packagesService.create(pkg);
    console.log(`Created package: ${pkg.name}`);
  }

  // Seed demo accounts
  const accounts = [
    {
      username: 'vietmap_user1',
      password: 'password123',
      isAvailable: true
    },
    {
      username: 'vietmap_user2',
      password: 'password123',
      isAvailable: true
    },
    {
      username: 'vietmap_user3',
      password: 'password123',
      isAvailable: true
    }
  ];

  for (const account of accounts) {
    await accountsService.create(account);
    console.log(`Created account: ${account.username}`);
  }

  console.log('Seeding completed!');
  await app.close();
}

bootstrap(); 