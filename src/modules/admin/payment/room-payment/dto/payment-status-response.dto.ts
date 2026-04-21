import { ApiProperty } from "@nestjs/swagger";

export class PaymentStatusResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nameEn: string;

    @ApiProperty()
    nameKh: string;
}