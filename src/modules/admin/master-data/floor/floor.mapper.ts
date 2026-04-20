import { CreateFloorRequestDto } from "./dto/create-floor-request.dto";
import { UpdateFloorRequestDto } from "./dto/update-floor-request.dto";
import { FloorResponseDto } from "./dto/floor-response.dto";
import { FloorEntity } from "./entities/floor.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";

export class FloorMapper {

    public static async toDto(entity: FloorEntity): Promise<FloorResponseDto> {
        const dto = new FloorResponseDto();

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

    public static toCreateEntity(dto: CreateFloorRequestDto): FloorEntity {
        const entity = new FloorEntity();
        
        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: FloorEntity, dto: UpdateFloorRequestDto): FloorEntity {
        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        
        return entity;
    }

}