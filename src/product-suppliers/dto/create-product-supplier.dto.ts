import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateProductSupplierDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  supplierId: number;
}
