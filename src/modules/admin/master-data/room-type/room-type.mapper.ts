import { CreateRoomTypeRequestDto } from "./dto/create-room-type-request.dto";
import { UpdateRoomTypeRequestDto } from "./dto/update-room-type-request.dto";
import { RoomTypeResponseDto } from "./dto/room-type-response.dto";
import { RoomTypeEntity } from "./entities/room-type.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";

export class RoomTypeMapper {

    public static async toDto(entity: RoomTypeEntity): Promise<RoomTypeResponseDto> {
        const dto = new RoomTypeResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        dto.code = entity.code;
        dto.nameEn = entity.nameEn; 
        dto.nameKh = entity.nameKh;
        dto.description = entity.description;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateRoomTypeRequestDto): RoomTypeEntity {
        const entity = new RoomTypeEntity();
        
        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: RoomTypeEntity, dto: UpdateRoomTypeRequestDto): RoomTypeEntity {
        
        entity.code = dto.code;
        entity.nameEn = dto.nameEn; 
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        
        return entity;
    }

}