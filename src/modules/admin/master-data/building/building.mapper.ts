import { CreateBuildingRequestDto } from "./dto/create-building-request.dto";
import { UpdateBuildingRequestDto } from "./dto/update-building-request.dto";
import { BuildingResponseDto } from "./dto/building-response.dto";
import { BuildingEntity } from "./entities/building.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";
import { BlockMapper } from "../block/block.mapper";

export class BuildingMapper {

    public static async toDto(entity: BuildingEntity): Promise<BuildingResponseDto> {
        const dto = new BuildingResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        dto.code = entity.code;
        dto.nameEn = entity.nameEn;
        dto.nameKh = entity.nameKh;
        dto.description = entity.description;
        dto.blockId = entity.blockId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.block) {
            dto.block = await BlockMapper.toDto(entity.block);
        }

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateBuildingRequestDto): BuildingEntity {
        const entity = new BuildingEntity();
        
        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        entity.blockId = dto.blockId;
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: BuildingEntity, dto: UpdateBuildingRequestDto): BuildingEntity {
        
        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        entity.blockId = dto.blockId;
        
        return entity;
    }

}