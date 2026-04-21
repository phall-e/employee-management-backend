import { CreateRoomPaymentRequestDto } from "./dto/create-room-payment-request.dto";
import { UpdateRoomPaymentRequestDto } from "./dto/update-room-payment-request.dto";
import { RoomPaymentResponseDto } from "./dto/room-payment-response.dto";
import { RoomPaymentEntity } from "./entities/room-payment.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";
import { RoomTenantMapper } from "@modules/admin/tenant/room-tenant/room-tenant.mapper";
import { PaymentStatusMapper } from "./payment-status.mapper";

export class RoomPaymentMapper {

    public static async toDto(entity: RoomPaymentEntity): Promise<RoomPaymentResponseDto> {
        const dto = new RoomPaymentResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        
        dto.roomTenantId = entity.roomTenantId;
        
        dto.amount = entity.amount;
        
        dto.month = entity.month;
        
        dto.paidDate = entity.paidtDate;
        
        dto.note = entity.note;
        
        dto.attachments = entity.attachments;
        
        dto.statusId = entity.statusId;
        
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.roomTenant) {
            dto.roomTenant = await RoomTenantMapper.toDto(entity.roomTenant);
        }

        if (entity.status) {
            dto.status = await PaymentStatusMapper.toDto(entity.status);
        }

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateRoomPaymentRequestDto): RoomPaymentEntity {
        const entity = new RoomPaymentEntity();
        
        entity.roomTenantId = dto.roomTenantId;
        
        entity.amount = dto.amount;
        
        entity.month = dto.month;
        
        entity.paidtDate = dto.paidDate;
        
        entity.note = dto.note;
        
        entity.attachments = dto.attachments;
        
        entity.statusId = dto.statusId;
        
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: RoomPaymentEntity, dto: UpdateRoomPaymentRequestDto): RoomPaymentEntity {
        
        entity.roomTenantId = dto.roomTenantId;
        
        entity.amount = dto.amount;
        
        entity.month = dto.month;
        
        entity.paidtDate = dto.paidDate;
        
        entity.note = dto.note;
        
        entity.attachments = dto.attachments;
        
        entity.statusId = dto.statusId;
        
        return entity;
    }

}