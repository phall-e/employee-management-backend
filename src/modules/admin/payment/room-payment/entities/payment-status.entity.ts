import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    schema: 'admin',
    name: 'payment_statuses',
})
export class PaymentStatusEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @Column({
        name: 'name_en',
        type: 'varchar',
        length: 160,
        unique: true,
        nullable: false,
    })
    nameEn: string;

    @Column({
        name: 'name_kh',
        type: 'varchar',
        length: 160,
        unique: true,
        nullable: false,
    })
    nameKh: string;

    constructor(partial?: Partial<PaymentStatusEntity>) {
        Object.assign(this, partial);
    }
}