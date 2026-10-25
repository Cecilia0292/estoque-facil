import { ConflictException, Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';


@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto){
    const cnpjAlreadyExists = await this.supplierRepository.existsBy({ cnpj: createSupplierDto.cnpj });
    if (cnpjAlreadyExists) {
      throw new ConflictException('Forncedor com esse CNPJ já cadastrado!'

      );
    }

    const supplier = this.supplierRepository.create(createSupplierDto);
    return this.supplierRepository.save(supplier);
  }

  async findAll() {
    return this.supplierRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    return this.supplierRepository.findOneBy({ id });
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.findOneBy({ id });

    if (!supplier) {
      throw new ConflictException('Fornecedor não encontrado!');
    }

    if(updateSupplierDto.cnpj){ 
      const cnpjAlreadyExists = await this.supplierRepository.existsBy({ cnpj: updateSupplierDto.cnpj });
      if (cnpjAlreadyExists && updateSupplierDto.cnpj !== supplier.cnpj) {
        throw new ConflictException('Fornecedor com esse CNPJ já cadastrado!');
      }

    }

    Object.assign(supplier, updateSupplierDto);
    return this.supplierRepository.save(supplier);
  }

  async remove(id: number) {
    const supplier = await this.supplierRepository.findOneBy({ id });

    if (!supplier) {
      throw new ConflictException('Fornecedor não encontrado!');
    }
    await this.supplierRepository.remove(supplier);

    return { message: 'Fornecedor removido com sucesso!' };
  } 

}
    

    
  