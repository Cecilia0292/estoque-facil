import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';
import { ProductSuppliersModule } from './product-suppliers/product-suppliers.module';

@Module({
  imports: [SuppliersModule, ProductsModule, ProductSuppliersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
