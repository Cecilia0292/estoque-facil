import { Test, TestingModule } from '@nestjs/testing';
import { ProductSuppliersController } from './product-suppliers.controller';
import { ProductSuppliersService } from './product-suppliers.service';
import { ProductsService } from '../products/products.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Supplier } from '../suppliers/entities/supplier.entity';

describe('ProductSuppliersController', () => {
  let controller: ProductSuppliersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSuppliersController],
      providers: [ProductSuppliersService, ProductsService, SuppliersService, {
        provide: getRepositoryToken(Supplier),
        useValue: {},
      }],
    }).compile();

    controller = module.get<ProductSuppliersController>(ProductSuppliersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
