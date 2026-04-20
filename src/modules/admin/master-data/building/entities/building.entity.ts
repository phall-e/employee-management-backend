import { BaseEntity } from "@database/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "@modules/admin/system/user/entities/user.entity";
import { BlockEntity } from "../../block/entities/block.entity";

@Entity({
    schema: 'admin',
    name: 'buildings',
})
export class BuildingEntity extends BaseEntity {

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
        name: 'block_id',
        type: 'integer',
        nullable: false,
    })
    blockId: number;

    @ManyToOne(() => BlockEntity, { nullable: true })
    @JoinColumn({
        name: 'block_id',
    })
    block: BlockEntity;

    @Column({
        name: 'created_by_user_id',
        type: 'integer',
        nullable: false,
    })
    createdByUserId: number;

    @ManyToOne(() => UserEntity, { nullable: true })
    @JoinColumn({
        name: 'created_by_user_id',
    })
    createdByUser: UserEntity;

    constructor(partial?: Partial<BuildingEntity>) {
        super();
        Object.assign(this, partial);
    }
}