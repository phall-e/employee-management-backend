import { CreateRoomTenantRequestDto } from "./dto/create-room-tenant-request.dto";
import { UpdateRoomTenantRequestDto } from "./dto/update-room-tenant-request.dto";
import { RoomTenantResponseDto } from "./dto/room-tenant-response.dto";
import { RoomTenantEntity } from "./entities/room-tenant.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";
import { RoomMapper } from "@modules/admin/master-data/room/room.mapper";
import { TenantStatusMapper } from "./tenant-status.mapper";

export class RoomTenantMapper {

    public static async toDto(entity: RoomTenantEntity): Promise<RoomTenantResponseDto> {
        const dto = new RoomTenantResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        
        dto.roomId = entity.roomId;
        
        dto.tenantName = entity.tenantName;
        
        dto.phoneNumber = entity.phoneNumber;
        
        dto.idCardNumber = entity.idCardNumber;
        
        dto.startDate = entity.startDate;
        
        dto.depositAmount = entity.depositAmount;
        
        dto.profile = entity.profile;
        
        dto.attachments = entity.attachments ? [...entity.attachments] : [];;
        
        dto.statusId = entity.statusId;
        
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        if (entity.room) {
            dto.room = await RoomMapper.toDto(entity.room);
        }

        if (entity.status) {
            dto.status = await TenantStatusMapper.toDto(entity.status);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateRoomTenantRequestDto): RoomTenantEntity {
        const entity = new RoomTenantEntity();
        
        entity.roomId = dto.roomId;
        
        entity.tenantName = dto.tenantName;
        
        entity.phoneNumber = dto.phoneNumber;
        
        entity.idCardNumber = dto.idCardNumber;
        
        entity.startDate = dto.startDate;
        
        entity.depositAmount = dto.depositAmount;
        
        entity.profile = dto.profile;
        
        entity.attachments = dto.attachments ? [...dto.attachments] : [];
        
        entity.statusId = dto.statusId;
        
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: RoomTenantEntity, dto: UpdateRoomTenantRequestDto): RoomTenantEntity {
        
        entity.roomId = dto.roomId;
        
        entity.tenantName = dto.tenantName;
        
        entity.phoneNumber = dto.phoneNumber;
        
        entity.idCardNumber = dto.idCardNumber;
        
        entity.startDate = dto.startDate;
        
        entity.depositAmount = dto.depositAmount;
        
        entity.profile = dto.profile;
        
        entity.attachments = dto.attachments ? [...dto.attachments] : [];
        
        entity.statusId = dto.statusId;
        
        return entity;
    }

}