import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

type Supplier = {
  id: number;
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  email: string;
  mainContact: string;
};

@Injectable()
export class SuppliersService {
  private suppliers: Supplier[]= [];
  private nextId = 1;

  create(createSupplierDto: CreateSupplierDto) {
    const cnpjAlreadyExists = this.suppliers.some(
      (supplier) => supplier.cnpj === createSupplierDto.cnpj,
    );
    if (cnpjAlreadyExists) {
      throw new ConflictException(
        'Fornecedor com esse CNPJ já está cadastrado!',
      );
    }
    const supplier: Supplier = {
      id: this.nextId++,
      ...createSupplierDto,
    };

    this.suppliers.push(supplier);

    return supplier;
  }

  findAll() {
    return this.suppliers;
  }

  findOne(id: number) {
    return this.suppliers.find((supplier) => supplier.id === id);
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const supplierIndex = this.suppliers.findIndex(
      (supplier) => supplier.id === id,
    );

    if (supplierIndex === -1) {
      return null;
    }

    this.suppliers[supplierIndex] = {
      ...this.suppliers[supplierIndex],
      ...updateSupplierDto,
    };

    return this.suppliers[supplierIndex];
  }

  remove(id: number) {
    const supplierIndex = this.suppliers.findIndex(
      (supplier) => supplier.id === id,
    );

    if (supplierIndex === -1) {
      return null;
    }

    const removedSupplier = this.suppliers.splice(supplierIndex, 1);

    return removedSupplier[0];
  }
}