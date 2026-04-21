import { BaseEntity } from "@database/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "@modules/admin/system/user/entities/user.entity";
import { RoomTenantEntity } from "@modules/admin/tenant/room-tenant/entities/room-tenant.entity";
import { AttachmentDto } from "@common/dtos/attachments.dto";
import { PaymentStatusEntity } from "./payment-status.entity";

@Entity({
    schema: 'admin',
    name: 'room_payments',
})
export class RoomPaymentEntity extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @Column({
        name: 'room_tenant_id',
        type: 'integer',
        nullable: false,
    })
    roomTenantId: number;

    @ManyToOne(() => RoomTenantEntity, { nullable: true })
    @JoinColumn({
        name: 'room_tenant_id',
    })
    roomTenant: RoomTenantEntity;

    @Column({
        name: 'amount',
        type: 'decimal',
        precision: 14,
        scale: 2,
        default: 0,
        nullable: true,
    })
    amount: number;

    @Column({
        name: 'month',
        type: 'date',
        nullable: false,
    })
    month: Date;

    @Column({
        name: 'paid_date',
        type: 'date',
        default: null,
        nullable: true,
    })
    paidtDate: Date;

    @Column({
        name: 'note',
        type: 'varchar',
        length: 160,
        nullable: true,
    })
    note: string;

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

    @ManyToOne(() => PaymentStatusEntity, { nullable: true })
    @JoinColumn({
        name: 'status_id',
    })
    status: PaymentStatusEntity;

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

    constructor(partial?: Partial<RoomPaymentEntity>) {
        super();
        Object.assign(this, partial);
    }
}