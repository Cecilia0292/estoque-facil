import {IsEmail, IsNotEmpty, IsString, Matches} from "class-validator";

export class CreateSupplierDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
        message: 'CNPJ deve estar no formato 00.000.000/0000-00',
    })
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
        message: 'Telefone deve estar no formato (00) 0000-0000',
    })
    phone: string;

    @IsEmail({}, { message: 'E-mail inválido' })
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    mainContact: string;
}


