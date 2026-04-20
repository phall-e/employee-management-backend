import { BaseEntity } from "@database/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "@modules/admin/system/user/entities/user.entity";
import { BranchEntity } from "../../branch/entities/branch.entity";

@Entity({
    schema: 'admin',
    name: 'blocks',
})
export class BlockEntity extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @Column({
        name: 'code',
        type: 'varchar',
        length: 160,
        unique: true,
        nullable: false,
    })
    code: string;

    @Column({
        name: 'name_en',
        type: 'varchar',
        length: 160,
        nullable: false,
    })
    nameEn: string;

    @Column({
        name: 'name_kh',
        type: 'varchar',
        length: 160,
        nullable: false,
    })
    nameKh: string;

    @Column({
        name: 'description',
        type: 'varchar',
        length: 160,
        nullable: true,
    })
    description: string;

    @Column({
        name: 'branch_id',
        type: 'integer',
        nullable: false,
    })
    branchId: number;

    @ManyToOne(() => BranchEntity, { nullable: true })
    @JoinColumn({
        name: 'branch_id',
    })
    branch: BranchEntity;

    @Column({
        name: 'created_by_user_id',
        type: 'integer',
        nullable: false,
    })
    createdByUserId: number;

    @ManyToOne(() => UserEntity, { nullable: true})
    @JoinColumn({
        name: 'created_by_user_id',
    })
    createdByUser: UserEntity;

    constructor(partial?: Partial<BlockEntity>) {
        super();
        Object.assign(this, partial);
    }
}