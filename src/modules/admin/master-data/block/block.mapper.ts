import { CreateBlockRequestDto } from "./dto/create-block-request.dto";
import { UpdateBlockRequestDto } from "./dto/update-block-request.dto";
import { BlockResponseDto } from "./dto/block-response.dto";
import { BlockEntity } from "./entities/block.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";
import { BranchMapper } from "../branch/branch.mapper";

export class BlockMapper {

    public static async toDto(entity: BlockEntity): Promise<BlockResponseDto> {
        const dto = new BlockResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        dto.code = entity.code;
        dto.nameEn = entity.nameEn;
        dto.nameKh = entity.nameKh;
        dto.description = entity.description;
        dto.branchId = entity.branchId;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.branch) {
            dto.branch = await BranchMapper.toDto(entity.branch);
        } 

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateBlockRequestDto): BlockEntity {
        const entity = new BlockEntity();
        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        entity.createdByUserId = dto.createdByUserId;
        entity.branchId = dto.branchId;

        return entity;
    }

    public static toUpdateEntity(entity: BlockEntity, dto: UpdateBlockRequestDto): BlockEntity {
        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        entity.branchId = dto.branchId;
        
        return entity;
    }

}