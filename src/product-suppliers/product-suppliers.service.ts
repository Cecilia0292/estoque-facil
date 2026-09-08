import {
  ConflictException, 
  Injectable, 
  NotFoundException 
} from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { CreateProductSupplierDto } from './dto/create-product-supplier.dto';
import { UpdateProductSupplierDto } from './dto/update-product-supplier.dto';

type ProductSupplier = {
  id: number;
  productId: number;
  supplierId: number;
};

@Injectable()
export class ProductSuppliersService {
  private productSuppliers: ProductSupplier[] = [];
  private nextId = 1;

  constructor(
    private readonly productsService: ProductsService,
    private readonly suppliersService: SuppliersService,
  ) {}

  create(createProductSupplierDto: CreateProductSupplierDto) {
    const { productId, supplierId } = createProductSupplierDto;

    const product = this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const supplier = this.suppliersService.findOne(supplierId);
    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    const alreadyAssociated = this.productSuppliers.some(
      (association) =>
        association.productId === productId &&
        association.supplierId === supplierId,
    );

    if (alreadyAssociated) {
      throw new ConflictException(
        'Fornecedor já está associado a este produto!',
      );
    }

    const association: ProductSupplier = {
      id: this.nextId++,
      productId,
      supplierId,
    };

    this.productSuppliers.push(association);

    return {
      message: 'Fornecedor associado com sucesso ao produto!',
      association,
    }

  }

  findSuppliersByProduct(productId: number) {
    const product = this.productsService.findOne(productId);
    
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.productSuppliers
    .filter((association) => association.productId === productId)
    .map((association) => {
      const supplier = this.suppliersService.findOne(
        association.supplierId
      );

      if (!supplier) {
        throw new NotFoundException('Fornecedor não encontrado');
      }

      return {
        associationId: association.id,
        supplierId: supplier.id,
        name: supplier.name,
        cnpj: supplier.cnpj,
      };
    });
  }

  findAll() {
    return this.productSuppliers;
  }

  findOne(id: number) {
    const association = this.productSuppliers.find(
      (item) => item.id === id,
    );
    if (!association) {
      throw new NotFoundException('Associação não encontrada');
    }
    return association;
  }

  update(
    id: number, updateProductSupplierDto: UpdateProductSupplierDto,
  ) {
    const associationIndex = this.productSuppliers.findIndex(
      (item) => item.id === id,
    );
    if (associationIndex === -1) {
      throw new NotFoundException('Associação não encontrada');
    }
    const currentAssociation = this.productSuppliers[associationIndex];

    const productId = updateProductSupplierDto.productId ?? currentAssociation.productId;
    const supplierId = updateProductSupplierDto.supplierId ?? currentAssociation.supplierId;

    const product = this.productsService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const supplier = this.suppliersService.findOne(supplierId);
    if (!supplier) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    const alreadyAssociated = this.productSuppliers.some(
      (item) =>
        item.productId === productId &&
        item.supplierId === supplierId &&
        item.id !== id,
    );
    if (alreadyAssociated) {
      throw new ConflictException(
        'Fornecedor já está associado a este produto!',
      );
    }

    const updatedAssociation: ProductSupplier = {
      id,
      productId,
      supplierId,
    };
    this.productSuppliers[associationIndex] = updatedAssociation;
    return updatedAssociation;
  }

  remove(id: number) {
    const associationIndex = this.productSuppliers.findIndex(
      (item) => item.id === id,
    );
    if (associationIndex === -1) {
      throw new NotFoundException('Associação não encontrada');
    }
    const [removedAssociation] = this.productSuppliers.splice(associationIndex, 1);
    return{
      message: 'Fornecedor desassociado com sucesso!',
      association: removedAssociation,
    };
  }
}
