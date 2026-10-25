import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('suppliers')
export class Supplier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:100})
    name: string;

    @Column({length:18, unique:true})
    cnpj: string;

    @Column({length:200})
    address: string;

    @Column({length:15})
    phone: string;

    @Column({length:254})
    email: string;

    @Column({length:100})
    maincontact: string;
}
