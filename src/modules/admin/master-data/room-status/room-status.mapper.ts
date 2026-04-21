import { CreateRoomStatusRequestDto } from "./dto/create-room-status-request.dto";
import { UpdateRoomStatusRequestDto } from "./dto/update-room-status-request.dto";
import { RoomStatusResponseDto } from "./dto/room-status-response.dto";
import { RoomStatusEntity } from "./entities/room-status.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";

export class RoomStatusMapper {

    public static async toDto(entity: RoomStatusEntity): Promise<RoomStatusResponseDto> {
        const dto = new RoomStatusResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        dto.nameEn = entity.nameEn;
        dto.nameKh = entity.nameKh;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateRoomStatusRequestDto): RoomStatusEntity {
        const entity = new RoomStatusEntity();
        
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: RoomStatusEntity, dto: UpdateRoomStatusRequestDto): RoomStatusEntity {
        
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        
        return entity;
    }

}