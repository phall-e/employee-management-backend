import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    schema: 'admin',
    name: 'tenant_statuses',
})
export class TenantStatusEntity {
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

    constructor(partial?: Partial<TenantStatusEntity>) {
        Object.assign(this, partial);
    }
}