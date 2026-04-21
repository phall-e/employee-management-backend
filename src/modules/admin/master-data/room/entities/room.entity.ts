import { BaseEntity } from "@database/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "@modules/admin/system/user/entities/user.entity";
import { RoomTypeEntity } from "../../room-type/entities/room-type.entity";
import { RoomStatusEntity } from "../../room-status/entities/room-status.entity";
import { BuildingEntity } from "../../building/entities/building.entity";
import { FloorEntity } from "../../floor/entities/floor.entity";

@Entity({
    schema: 'admin',
    name: 'rooms',
})
export class RoomEntity extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;

    @Column({
        name: 'room_number',
        type: 'varchar',
        length: 160,
        unique: true,
        nullable: false,
    })
    roomNumber: string;

    @Column({
        name: 'building_id',
        type: 'integer',
        nullable: false,
    })
    buildingId: number;

    @ManyToOne(() => BuildingEntity, { nullable: true })
    @JoinColumn({
        name: 'building_id',
    })
    building: BuildingEntity;

    @Column({
        name: 'floor_id',
        type: 'integer',
        nullable: false,
    })
    floorId: number;

    @ManyToOne(() => FloorEntity, { nullable: true })
    @JoinColumn({
        name: 'floor_id',
    })
    floor: FloorEntity;

    @Column({
        name: 'room_type_id',
        type: 'integer',
        nullable: false,
    })
    roomTypeId: number;

    @ManyToOne(() => RoomTypeEntity, { nullable: true })
    @JoinColumn({
        name: 'room_type_id',
    })
    roomType: RoomTypeEntity;

    @Column({
        name: 'price',
        type: 'decimal',
        precision: 14,
        scale: 2,
        default: 0,
        nullable: false,
    })
    price: number;

    @Column({
        name: 'status_id',
        type: 'integer',
        nullable: false,
    })
    statusId: number;

    @ManyToOne(() => RoomStatusEntity, { nullable: true })
    @JoinColumn({
        name: 'status_id'
    })
    status: RoomStatusEntity;

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

    constructor(partial?: Partial<RoomEntity>) {
        super();
        Object.assign(this, partial);
    }
}