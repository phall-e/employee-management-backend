import { CreateRoomRequestDto } from "./dto/create-room-request.dto";
import { UpdateRoomRequestDto } from "./dto/update-room-request.dto";
import { RoomResponseDto } from "./dto/room-response.dto";
import { RoomEntity } from "./entities/room.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";
import { RoomTypeMapper } from "../room-type/room-type.mapper";
import { RoomStatusMapper } from "../room-status/room-status.mapper";
import { BuildingMapper } from "../building/building.mapper";

export class RoomMapper {

    public static async toDto(entity: RoomEntity): Promise<RoomResponseDto> {
        const dto = new RoomResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        dto.buildingId = entity.buildingId;
        dto.roomNumber = entity.roomNumber;   
        dto.roomTypeId = entity.roomTypeId; 
        dto.price = entity.price ? parseFloat(entity.price as any) : 0;
        dto.statusId = entity.statusId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.building) {
            dto.building = await BuildingMapper.toDto(entity.building);
        }

        if (entity.roomType) {
            dto.roomType = await RoomTypeMapper.toDto(entity.roomType);
        }

        if (entity.status) {
            dto.status = await RoomStatusMapper.toDto(entity.status);
        }

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateRoomRequestDto): RoomEntity {
        const entity = new RoomEntity();
        
        entity.roomNumber = dto.roomNumber;
        entity.buildingId = dto.buildingId;
        entity.floorId = dto.floorId;
        entity.roomTypeId = dto.roomTypeId;
        entity.price = dto.price;
        entity.statusId = dto.statusId;
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: RoomEntity, dto: UpdateRoomRequestDto): RoomEntity {
        entity.roomNumber = dto.roomNumber;
        entity.buildingId = dto.buildingId;
        entity.floorId = dto.floorId;
        entity.roomTypeId = dto.roomTypeId;
        entity.price = dto.price;
        entity.statusId = dto.statusId;
        
        return entity;
    }

}