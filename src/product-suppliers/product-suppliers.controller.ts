import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSuppliersService } from './product-suppliers.service';
import { CreateProductSupplierDto } from './dto/create-product-supplier.dto';
import { UpdateProductSupplierDto } from './dto/update-product-supplier.dto';

@Controller('product-suppliers')
export class ProductSuppliersController {
  constructor(private readonly productSuppliersService: ProductSuppliersService) {}

  @Post()
  create(@Body() createProductSupplierDto: CreateProductSupplierDto) {
    return this.productSuppliersService.create(createProductSupplierDto);
  }

  @Get()
  findAll() {
    return this.productSuppliersService.findAll();
  }

  @Get('product/:productId')
  findSuppliersByProduct(@Param('productId') productId: string) {
    return this.productSuppliersService.findSuppliersByProduct(+productId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSuppliersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSupplierDto: UpdateProductSupplierDto) {
    return this.productSuppliersService.update(+id, updateProductSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSuppliersService.remove(+id);
  }
}
