import {IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Min} from "class-validator";

export enum ProductCategory {
  ELECTRONICS = 'ELETRÔNICOS',
  CLOTHING = 'VESTUÁRIO',
  FOOD = 'ALIMENTOS',
  OTHER = 'OUTROS',    
}

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @Matches(/^\d{13}$/, { 
        message: 'O código de barras deve conter exatamente 13 números.' 
    })
    barcode?: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    stockQuantity?: number;

    @IsEnum(ProductCategory, {
        message: 'Categoria inválida'
    })
    category: ProductCategory;

    @IsOptional()
    @IsDateString({}, {
        message: 'Data de validade inválida',
    })
    expirationDate?: string;

    @IsOptional()
    @IsString()
    categoryOther?: string;

}
