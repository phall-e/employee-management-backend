import { UserMapper } from "@modules/admin/system/user/user.mapper";
import { BranchResponseDto } from "./dto/branch-response.dto";
import { BranchEntity } from "./entities/branch.entity";
import { CreateBranchRequestDto } from "./dto/create-branch-request.dto";
import { UpdateBranchRequestDto } from "./dto/update-branch-request.dto";

export class BranchMapper {
    public static async toDto(entity: BranchEntity): Promise<BranchResponseDto> {
        const dto = new BranchResponseDto();

        dto.id = entity.id;
        dto.code = entity.code;
        dto.nameEn = entity.nameEn;
        dto.nameKh = entity.nameKh;
        dto.description = entity.description;
        dto.phoneNumber = entity.phoneNumber;
        dto.managerId = entity.managerId;
        dto.address = entity.address;
        dto.createdById = entity.createdById;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.manager) {
            dto.manager = await UserMapper.toDto(entity.manager);
        }

        if (entity.createdBy) {
            dto.createdBy = await UserMapper.toDto(entity.createdBy);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateBranchRequestDto): BranchEntity {
        const entity = new BranchEntity();

        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        entity.phoneNumber = dto.phoneNumber;
        entity.managerId = dto.managerId;
        entity.address = dto.address;
        entity.createdById = dto.createdById;

        return entity;
    }

    public static toUpdateEntity(entity:BranchEntity, dto: UpdateBranchRequestDto): BranchEntity {
        entity.code = dto.code;
        entity.nameEn = dto.nameEn;
        entity.nameKh = dto.nameKh;
        entity.description = dto.description;
        entity.phoneNumber = dto.phoneNumber;
        entity.managerId = dto.managerId;
        entity.address = dto.address;

        return entity;
    }
}