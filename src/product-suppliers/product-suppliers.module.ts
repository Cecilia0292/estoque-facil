import { Module } from '@nestjs/common';
import { ProductSuppliersService } from './product-suppliers.service';
import { ProductSuppliersController } from './product-suppliers.controller';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule, SuppliersModule],
  controllers: [ProductSuppliersController],
  providers: [ProductSuppliersService],
})
export class ProductSuppliersModule {}
