import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

type Product = CreateProductDto & {
  id: number;
};

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private nextId = 1;

  create(createProductDto: CreateProductDto) {
    const barcodeAlreadyExists = createProductDto.barcode
      ? this.products.some(
          (product) => product.barcode === createProductDto.barcode,
        )
      : false;

    if (barcodeAlreadyExists) {
      throw new ConflictException(
        'Já existe um produto com esse código de barras!',
      );
    }

    const product: Product = {
      id: this.nextId++,
      ...createProductDto,
    };
    this.products.push(product);
    return product;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return null;
    }

    const barcodeAlreadyExists = updateProductDto.barcode && this.products.some(
      (product) => product.barcode === updateProductDto.barcode && product.id !== id,
    );
    if (barcodeAlreadyExists) {
      throw new ConflictException(
        'Já existe um produto com esse código de barras!',
      );
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };

    return this.products[productIndex];
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex === -1) {
      return null;
    }

    const removedProduct = this.products.splice(productIndex, 1);

    return removedProduct[0];
  }
}
