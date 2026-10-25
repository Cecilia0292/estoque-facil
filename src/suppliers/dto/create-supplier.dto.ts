import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxLength, 
    Matches
} from "class-validator";

export class CreateSupplierDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100, { message: 'O nome do fornecedor deve ter no máximo 100 caracteres' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(18, 18, { message: 'CNPJ deve ter exatamente 18 caracteres' })
    @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
        message: 'CNPJ deve estar no formato 00.000.000/0000-00',
    })
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200, { message: 'O endereço deve ter no máximo 200 caracteres' })
    address: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
        message: 'Telefone deve estar no formato (00) 0000-0000 ou (00) 00000-0000',
    })
    @MaxLength(15, { message: 'O telefone deve ter no máximo 15 caracteres' })
    phone: string;

    @IsEmail({}, { message: 'Informe um e-mail válido, como contato@empresa.com' })
    @IsNotEmpty()
    @MaxLength(254, { message: 'O e-mail deve ter no máximo 254 caracteres' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100, { message: 'O nome do contato principal deve ter no máximo 100 caracteres' })
    mainContact: string;
}


