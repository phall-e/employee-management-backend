import { TenantStatusResponseDto } from "./dto/tenant-status-response.dto";
import { TenantStatusEntity } from "./entities/tenant-status.entity";

export class TenantStatusMapper {
    public static async toDto(entity: TenantStatusEntity): Promise<TenantStatusResponseDto> {
        const dto = new TenantStatusResponseDto();

        dto.id = entity.id;
        dto.nameEn = entity.nameEn;
        dto.nameKh = entity.nameKh;

        return dto;
    }
}