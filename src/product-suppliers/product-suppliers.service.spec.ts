import { Test, TestingModule } from '@nestjs/testing';
import { ProductSuppliersService } from './product-suppliers.service';
import { ProductsService } from '../products/products.service';
import { SuppliersService } from '../suppliers/suppliers.service';

describe('ProductSuppliersService', () => {
  let service: ProductSuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductSuppliersService, ProductsService, SuppliersService],
    }).compile();

    service = module.get<ProductSuppliersService>(ProductSuppliersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
