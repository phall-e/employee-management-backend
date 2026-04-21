import { PaymentStatusResponseDto } from "./dto/payment-status-response.dto";
import { PaymentStatusEntity } from "./entities/payment-status.entity";

export class PaymentStatusMapper {
    public static async toDto(entity: PaymentStatusEntity): Promise<PaymentStatusResponseDto> {
        const dto = new PaymentStatusResponseDto();

        dto.id = entity.id;
        dto.nameEn = entity.nameEn;
        dto.nameKh = entity.nameKh;

        return dto;
    }
}