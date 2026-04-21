import { BaseEntity } from "@database/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "@modules/admin/system/user/entities/user.entity";

@Entity({
    schema: 'admin',
    name: 'room_statuses',
})
export class RoomStatusEntity extends BaseEntity {

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

    constructor(partial?: Partial<RoomStatusEntity>) {
        super();
        Object.assign(this, partial);
    }
}