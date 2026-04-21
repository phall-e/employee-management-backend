import { BaseEntity } from "@database/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "@modules/admin/system/user/entities/user.entity";
import { RoomEntity } from "@modules/admin/master-data/room/entities/room.entity";
import { AttachmentDto } from "@common/dtos/attachments.dto";
import { TenantStatusEntity } from "./tenant-status.entity";

@Entity({
    schema: 'admin',
    name: 'room_tenants',
})
export class RoomTenantEntity extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @Column({
        name: 'room_id',
        type: 'integer',
        nullable: false,
    })
    roomId: number;

    @ManyToOne(() => RoomEntity, { nullable: true })
    @JoinColumn({
        name: 'room_id',
    })
    room: RoomEntity;

    @Column({
        name: 'tenant_name',
        type: 'varchar',
        length: 160,
        nullable: false,
    })
    tenantName: string;

    @Column({
        name: 'phone_number',
        type: 'varchar',
        length: 160,
        nullable: false,
    })
    phoneNumber: string;

    @Column({
        name: 'id_card_number',
        type: 'varchar',
        length: 160,
        nullable: false,
    })
    idCardNumber: string;

    @Column({
        name: 'start_date',
        type: 'date',
        default: null,
        nullable: true,
    })
    startDate: Date;

    @Column({
        name: 'deposit_amount',
        type: 'decimal',
        precision: 14,
        scale: 2,
        default: 0,
        nullable: false,
    })
    depositAmount: number;

    @Column({
        name: 'profile',
        type: 'varchar',
        length: 160,
        nullable: true,
    })
    profile: string;

    @Column({
        name: 'attachments',
        type: 'jsonb',
        nullable: true,
    })
    attachments: AttachmentDto[];

    @Column({
        name: 'status_id',
        type: 'integer',
        nullable: false,
    })
    statusId: number;

    @ManyToOne(() => TenantStatusEntity, { nullable: true })
    @JoinColumn({
        name: 'status_id',
    })
    status: TenantStatusEntity;

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

    constructor(partial?: Partial<RoomTenantEntity>) {
        super();
        Object.assign(this, partial);
    }
}